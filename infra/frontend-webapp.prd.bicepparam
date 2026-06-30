using './frontend-webapp.bicep'

param appServicePlanName = 'cookboek-prd-plan'
param webAppName = 'cookboek-prd-app'

param appSettings = {
  WEBSITE_NODE_DEFAULT_VERSION: '~22'
  SCM_DO_BUILD_DURING_DEPLOYMENT: 'false'
}
