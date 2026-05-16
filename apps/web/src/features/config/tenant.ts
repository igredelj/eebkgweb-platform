import { tenantConfigSchema, type TenantConfig } from '@eebkg/config-schema';

const tenantFromHost = () => {
  const params = new URLSearchParams(window.location.search);
  const tenantParam = params.get('tenant');

  if (tenantParam) {
    return tenantParam;
  }

  const [subdomain] = window.location.hostname.split('.');

  if (subdomain && !['localhost', '127', '0'].includes(subdomain)) {
    return subdomain;
  }

  return 'skywing';
};

export const loadTenantConfig = async (): Promise<TenantConfig> => {
  const tenantId = tenantFromHost();
  const response = await fetch(`/api/tenant-config?tenant=${tenantId}`);

  if (!response.ok) {
    throw new Error('Tenant configuration could not be loaded.');
  }

  return tenantConfigSchema.parse(await response.json());
};

export const applyTenantTheme = (config: TenantConfig) => {
  const root = document.documentElement;
  const { colors } = config.theme;

  root.style.setProperty('--color-primary', colors.primary);
  root.style.setProperty('--color-primary-text', colors.primaryText);
  root.style.setProperty('--color-background', colors.background);
  root.style.setProperty('--color-surface', colors.surface);
  root.style.setProperty('--color-border', colors.border);
  root.style.setProperty('--color-text', colors.text);
  root.style.setProperty('--color-muted-text', colors.mutedText);
  root.style.setProperty('--color-accent', colors.accent);
  root.style.setProperty('--color-danger', colors.danger);
  root.style.setProperty('--radius', config.theme.radius);
  root.style.setProperty('--font-family', config.theme.fontFamily);
};
