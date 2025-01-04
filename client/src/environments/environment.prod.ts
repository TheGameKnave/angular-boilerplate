// Function to get the base URL from the current location
function getBaseUrl(): string {
  const { protocol, hostname, port } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

// Dynamic environment configuration
export const ENVIRONMENT = {
  baseUrl: getBaseUrl(),
  env: 'production',
};
