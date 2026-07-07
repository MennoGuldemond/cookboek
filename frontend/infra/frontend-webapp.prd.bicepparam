using './frontend-webapp.bicep'

param appServicePlanName = 'cookboek-prd-plan'
param webAppName = 'cookboek'

param appSettings = {
  WEBSITE_NODE_DEFAULT_VERSION: '~22'
  SCM_DO_BUILD_DURING_DEPLOYMENT: 'false'
}
