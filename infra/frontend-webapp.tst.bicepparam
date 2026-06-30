using './frontend-webapp.bicep'

param appServicePlanName = 'cookboek-tst-plan'
param webAppName = 'cookboek-tst-app'

param appSettings = {
  WEBSITE_NODE_DEFAULT_VERSION: '~22'
  SCM_DO_BUILD_DURING_DEPLOYMENT: 'false'
}
