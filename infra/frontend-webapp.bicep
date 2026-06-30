targetScope = 'resourceGroup'

@description('Azure location for the web app. Defaults to the current resource group location.')
param location string = resourceGroup().location

@description('Name of the existing App Service Plan to host this frontend web app.')
param appServicePlanName string

@description('Name of the frontend Azure Web App to create.')
param webAppName string

@description('Optional app settings to add to the frontend web app.')
param appSettings object = {}

resource appServicePlan 'Microsoft.Web/serverfarms@2024-04-01' existing = {
  name: appServicePlanName
}

resource webApp 'Microsoft.Web/sites@2024-04-01' = {
  name: webAppName
  location: location
  kind: 'app'
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
  }
}

resource webAppAppSettings 'Microsoft.Web/sites/config@2024-04-01' = {
  parent: webApp
  name: 'appsettings'
  properties: union(
    {
      WEBSITE_RUN_FROM_PACKAGE: '1'
    },
    appSettings
  )
}

output webAppId string = webApp.id
output defaultHostname string = webApp.properties.defaultHostName
