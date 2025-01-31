// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: '2c224e7e-3ef5-431d-a57b-e71f4662e3a6',
    name: 'Node CLI Test',
    user: {
      name: 'user@domain.example',
      type: 'user'
    },
    tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47',
    state: 'Enabled',
    registeredProviders: ['mobileservice'],
    _eventsCount: '1',
    isDefault: true
  }, newProfile.environments['AzureCloud']));

  return newProfile;
};

exports.setEnvironment = function() {
  process.env['AZURE_VM_TEST_LOCATION'] = 'eastus';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-express-route-circuit/providers/Microsoft.Network/expressRouteCircuits?api-version=2016-12-01')
  .reply(200, "{\r\n  \"value\": [\r\n    {\r\n      \"name\": \"test-circuit\",\r\n      \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-express-route-circuit/providers/Microsoft.Network/expressRouteCircuits/test-circuit\",\r\n      \"etag\": \"W/\\\"c7a2d7ed-f34a-4603-9b36-423512213195\\\"\",\r\n      \"type\": \"Microsoft.Network/expressRouteCircuits\",\r\n      \"location\": \"eastus\",\r\n      \"tags\": {\r\n        \"tag1\": \"aaa\",\r\n        \"tag2\": \"bbb\",\r\n        \"tag3\": \"ccc\"\r\n      },\r\n      \"properties\": {\r\n        \"provisioningState\": \"Succeeded\",\r\n        \"resourceGuid\": \"1c33e7ae-19f6-4b46-91af-5b8272541d6d\",\r\n        \"peerings\": [],\r\n        \"authorizations\": [],\r\n        \"serviceProviderProperties\": {\r\n          \"serviceProviderName\": \"InterCloud\",\r\n          \"peeringLocation\": \"London\",\r\n          \"bandwidthInMbps\": 500\r\n        },\r\n        \"circuitProvisioningState\": \"Enabled\",\r\n        \"allowClassicOperations\": false,\r\n        \"serviceKey\": \"c5ff9ff7-912f-4fda-87eb-db08b6c7bd78\",\r\n        \"serviceProviderProvisioningState\": \"NotProvisioned\"\r\n      },\r\n      \"sku\": {\r\n        \"name\": \"Standard_MeteredData\",\r\n        \"tier\": \"Premium\",\r\n        \"family\": \"UnlimitedData\"\r\n      }\r\n    }\r\n  ]\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '1206',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': 'bde40956-1145-4d3f-88b4-b0dc5707b24a',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14992',
  'x-ms-correlation-request-id': '0b2964a7-e98b-4731-a177-b644200c8060',
  'x-ms-routing-request-id': 'WESTEUROPE:20170427T094942Z:0b2964a7-e98b-4731-a177-b644200c8060',
  date: 'Thu, 27 Apr 2017 09:49:41 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-express-route-circuit/providers/Microsoft.Network/expressRouteCircuits?api-version=2016-12-01')
  .reply(200, "{\r\n  \"value\": [\r\n    {\r\n      \"name\": \"test-circuit\",\r\n      \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-express-route-circuit/providers/Microsoft.Network/expressRouteCircuits/test-circuit\",\r\n      \"etag\": \"W/\\\"c7a2d7ed-f34a-4603-9b36-423512213195\\\"\",\r\n      \"type\": \"Microsoft.Network/expressRouteCircuits\",\r\n      \"location\": \"eastus\",\r\n      \"tags\": {\r\n        \"tag1\": \"aaa\",\r\n        \"tag2\": \"bbb\",\r\n        \"tag3\": \"ccc\"\r\n      },\r\n      \"properties\": {\r\n        \"provisioningState\": \"Succeeded\",\r\n        \"resourceGuid\": \"1c33e7ae-19f6-4b46-91af-5b8272541d6d\",\r\n        \"peerings\": [],\r\n        \"authorizations\": [],\r\n        \"serviceProviderProperties\": {\r\n          \"serviceProviderName\": \"InterCloud\",\r\n          \"peeringLocation\": \"London\",\r\n          \"bandwidthInMbps\": 500\r\n        },\r\n        \"circuitProvisioningState\": \"Enabled\",\r\n        \"allowClassicOperations\": false,\r\n        \"serviceKey\": \"c5ff9ff7-912f-4fda-87eb-db08b6c7bd78\",\r\n        \"serviceProviderProvisioningState\": \"NotProvisioned\"\r\n      },\r\n      \"sku\": {\r\n        \"name\": \"Standard_MeteredData\",\r\n        \"tier\": \"Premium\",\r\n        \"family\": \"UnlimitedData\"\r\n      }\r\n    }\r\n  ]\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '1206',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': 'bde40956-1145-4d3f-88b4-b0dc5707b24a',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14992',
  'x-ms-correlation-request-id': '0b2964a7-e98b-4731-a177-b644200c8060',
  'x-ms-routing-request-id': 'WESTEUROPE:20170427T094942Z:0b2964a7-e98b-4731-a177-b644200c8060',
  date: 'Thu, 27 Apr 2017 09:49:41 GMT',
  connection: 'close' });
 return result; }]];