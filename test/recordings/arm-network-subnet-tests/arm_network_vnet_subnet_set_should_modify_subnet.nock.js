// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: 'bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948',
    managementCertificate: {
      key: 'mockedKey',
      cert: 'mockedCert'
    },
    name: 'CollaberaInteropTest',
    user: {
      name: 'user@domain.example',
      type: 'user'
    },
    registeredProviders: [],
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
  .get('/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/virtualnetworks/xplatTestVnet/subnets/xplatTestSubnet?api-version=2015-05-01-preview')
  .reply(200, "{\r\n  \"name\": \"xplatTestSubnet\",\r\n  \"id\": \"/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/virtualNetworks/xplatTestVnet/subnets/xplatTestSubnet\",\r\n  \"etag\": \"W/\\\"bd2d9e2e-d979-4369-8614-85c2e5565596\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"addressPrefix\": \"10.0.0.0/24\",\r\n    \"networkSecurityGroup\": {\r\n      \"id\": \"/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/networkSecurityGroups/xplatTestNsg\"\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '581',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"bd2d9e2e-d979-4369-8614-85c2e5565596"',
  'x-ms-request-id': '6ca0a30d-9079-4ec2-ba82-a94734532c30',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14947',
  'x-ms-correlation-request-id': '146f9684-e8d0-4de3-9f53-72e995ae09e0',
  'x-ms-routing-request-id': 'SOUTHEASTASIA:20150521T080822Z:146f9684-e8d0-4de3-9f53-72e995ae09e0',
  date: 'Thu, 21 May 2015 08:08:22 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/virtualnetworks/xplatTestVnet/subnets/xplatTestSubnet?api-version=2015-05-01-preview')
  .reply(200, "{\r\n  \"name\": \"xplatTestSubnet\",\r\n  \"id\": \"/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/virtualNetworks/xplatTestVnet/subnets/xplatTestSubnet\",\r\n  \"etag\": \"W/\\\"bd2d9e2e-d979-4369-8614-85c2e5565596\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"addressPrefix\": \"10.0.0.0/24\",\r\n    \"networkSecurityGroup\": {\r\n      \"id\": \"/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/networkSecurityGroups/xplatTestNsg\"\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '581',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"bd2d9e2e-d979-4369-8614-85c2e5565596"',
  'x-ms-request-id': '6ca0a30d-9079-4ec2-ba82-a94734532c30',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14947',
  'x-ms-correlation-request-id': '146f9684-e8d0-4de3-9f53-72e995ae09e0',
  'x-ms-routing-request-id': 'SOUTHEASTASIA:20150521T080822Z:146f9684-e8d0-4de3-9f53-72e995ae09e0',
  date: 'Thu, 21 May 2015 08:08:22 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/virtualnetworks/xplatTestVnet?api-version=2015-05-01-preview')
  .reply(200, "{\r\n  \"name\": \"xplatTestVnet\",\r\n  \"id\": \"/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/virtualNetworks/xplatTestVnet\",\r\n  \"etag\": \"W/\\\"bd2d9e2e-d979-4369-8614-85c2e5565596\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"addressSpace\": {\r\n      \"addressPrefixes\": [\r\n        \"10.0.0.0/8\"\r\n      ]\r\n    },\r\n    \"dhcpOptions\": {},\r\n    \"subnets\": [\r\n      {\r\n        \"name\": \"xplatTestSubnet\",\r\n        \"id\": \"/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/virtualNetworks/xplatTestVnet/subnets/xplatTestSubnet\",\r\n        \"etag\": \"W/\\\"bd2d9e2e-d979-4369-8614-85c2e5565596\\\"\",\r\n        \"properties\": {\r\n          \"provisioningState\": \"Succeeded\",\r\n          \"addressPrefix\": \"10.0.0.0/24\",\r\n          \"networkSecurityGroup\": {\r\n            \"id\": \"/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/networkSecurityGroups/xplatTestNsg\"\r\n          }\r\n        }\r\n      }\r\n    ]\r\n  },\r\n  \"location\": \"eastus\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '1131',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"bd2d9e2e-d979-4369-8614-85c2e5565596"',
  'x-ms-request-id': 'b3d4c867-c903-459f-9faa-14a69b02108b',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14946',
  'x-ms-correlation-request-id': '7777809f-86d7-477d-a6c8-515e882354e2',
  'x-ms-routing-request-id': 'SOUTHEASTASIA:20150521T080824Z:7777809f-86d7-477d-a6c8-515e882354e2',
  date: 'Thu, 21 May 2015 08:08:23 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/virtualnetworks/xplatTestVnet?api-version=2015-05-01-preview')
  .reply(200, "{\r\n  \"name\": \"xplatTestVnet\",\r\n  \"id\": \"/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/virtualNetworks/xplatTestVnet\",\r\n  \"etag\": \"W/\\\"bd2d9e2e-d979-4369-8614-85c2e5565596\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"addressSpace\": {\r\n      \"addressPrefixes\": [\r\n        \"10.0.0.0/8\"\r\n      ]\r\n    },\r\n    \"dhcpOptions\": {},\r\n    \"subnets\": [\r\n      {\r\n        \"name\": \"xplatTestSubnet\",\r\n        \"id\": \"/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/virtualNetworks/xplatTestVnet/subnets/xplatTestSubnet\",\r\n        \"etag\": \"W/\\\"bd2d9e2e-d979-4369-8614-85c2e5565596\\\"\",\r\n        \"properties\": {\r\n          \"provisioningState\": \"Succeeded\",\r\n          \"addressPrefix\": \"10.0.0.0/24\",\r\n          \"networkSecurityGroup\": {\r\n            \"id\": \"/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/networkSecurityGroups/xplatTestNsg\"\r\n          }\r\n        }\r\n      }\r\n    ]\r\n  },\r\n  \"location\": \"eastus\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '1131',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"bd2d9e2e-d979-4369-8614-85c2e5565596"',
  'x-ms-request-id': 'b3d4c867-c903-459f-9faa-14a69b02108b',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14946',
  'x-ms-correlation-request-id': '7777809f-86d7-477d-a6c8-515e882354e2',
  'x-ms-routing-request-id': 'SOUTHEASTASIA:20150521T080824Z:7777809f-86d7-477d-a6c8-515e882354e2',
  date: 'Thu, 21 May 2015 08:08:23 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/virtualnetworks/xplatTestVnet/subnets/xplatTestSubnet?api-version=2015-05-01-preview', '*')
  .reply(200, "{\r\n  \"name\": \"xplatTestSubnet\",\r\n  \"id\": \"/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/virtualNetworks/xplatTestVnet/subnets/xplatTestSubnet\",\r\n  \"etag\": \"W/\\\"e3b82f07-de9d-4b70-93ed-381a91ddf555\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Updating\",\r\n    \"addressPrefix\": \"10.0.1.0/24\",\r\n    \"networkSecurityGroup\": {\r\n      \"id\": \"/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/networkSecurityGroups/xplatTestNsg\"\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '580',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'retry-after': '10',
  'x-ms-request-id': '85f76206-067a-47d9-ac45-ebb52d684c37',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/providers/Microsoft.Network/locations/eastus/operations/85f76206-067a-47d9-ac45-ebb52d684c37?api-version=2015-05-01-preview',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1187',
  'x-ms-correlation-request-id': '46ede986-43e0-4a05-aea7-1eac9f0df753',
  'x-ms-routing-request-id': 'SOUTHEASTASIA:20150521T080825Z:46ede986-43e0-4a05-aea7-1eac9f0df753',
  date: 'Thu, 21 May 2015 08:08:25 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/virtualnetworks/xplatTestVnet/subnets/xplatTestSubnet?api-version=2015-05-01-preview', '*')
  .reply(200, "{\r\n  \"name\": \"xplatTestSubnet\",\r\n  \"id\": \"/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/virtualNetworks/xplatTestVnet/subnets/xplatTestSubnet\",\r\n  \"etag\": \"W/\\\"e3b82f07-de9d-4b70-93ed-381a91ddf555\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Updating\",\r\n    \"addressPrefix\": \"10.0.1.0/24\",\r\n    \"networkSecurityGroup\": {\r\n      \"id\": \"/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/networkSecurityGroups/xplatTestNsg\"\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '580',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'retry-after': '10',
  'x-ms-request-id': '85f76206-067a-47d9-ac45-ebb52d684c37',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/providers/Microsoft.Network/locations/eastus/operations/85f76206-067a-47d9-ac45-ebb52d684c37?api-version=2015-05-01-preview',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1187',
  'x-ms-correlation-request-id': '46ede986-43e0-4a05-aea7-1eac9f0df753',
  'x-ms-routing-request-id': 'SOUTHEASTASIA:20150521T080825Z:46ede986-43e0-4a05-aea7-1eac9f0df753',
  date: 'Thu, 21 May 2015 08:08:25 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/providers/Microsoft.Network/locations/eastus/operations/85f76206-067a-47d9-ac45-ebb52d684c37?api-version=2015-05-01-preview')
  .reply(200, "{\r\n  \"status\": \"Succeeded\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '29',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '2efeb58f-beda-4a86-95aa-6a38818f3e8a',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14948',
  'x-ms-correlation-request-id': 'bc903fbf-4539-4662-ac99-9c95686ca7a7',
  'x-ms-routing-request-id': 'SOUTHEASTASIA:20150521T080837Z:bc903fbf-4539-4662-ac99-9c95686ca7a7',
  date: 'Thu, 21 May 2015 08:08:37 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/providers/Microsoft.Network/locations/eastus/operations/85f76206-067a-47d9-ac45-ebb52d684c37?api-version=2015-05-01-preview')
  .reply(200, "{\r\n  \"status\": \"Succeeded\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '29',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '2efeb58f-beda-4a86-95aa-6a38818f3e8a',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14948',
  'x-ms-correlation-request-id': 'bc903fbf-4539-4662-ac99-9c95686ca7a7',
  'x-ms-routing-request-id': 'SOUTHEASTASIA:20150521T080837Z:bc903fbf-4539-4662-ac99-9c95686ca7a7',
  date: 'Thu, 21 May 2015 08:08:37 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/virtualnetworks/xplatTestVnet/subnets/xplatTestSubnet?api-version=2015-05-01-preview')
  .reply(200, "{\r\n  \"name\": \"xplatTestSubnet\",\r\n  \"id\": \"/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/virtualNetworks/xplatTestVnet/subnets/xplatTestSubnet\",\r\n  \"etag\": \"W/\\\"81c0f1d0-883f-4cb4-9746-7bd054eba38a\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"addressPrefix\": \"10.0.1.0/24\",\r\n    \"networkSecurityGroup\": {\r\n      \"id\": \"/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/networkSecurityGroups/xplatTestNsg\"\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '581',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"81c0f1d0-883f-4cb4-9746-7bd054eba38a"',
  'x-ms-request-id': 'b7a5087a-8086-4d21-8b3c-ddec391fdb44',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14958',
  'x-ms-correlation-request-id': '8da72bda-8037-4526-8d00-d156691eb685',
  'x-ms-routing-request-id': 'SOUTHEASTASIA:20150521T080838Z:8da72bda-8037-4526-8d00-d156691eb685',
  date: 'Thu, 21 May 2015 08:08:38 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/virtualnetworks/xplatTestVnet/subnets/xplatTestSubnet?api-version=2015-05-01-preview')
  .reply(200, "{\r\n  \"name\": \"xplatTestSubnet\",\r\n  \"id\": \"/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/virtualNetworks/xplatTestVnet/subnets/xplatTestSubnet\",\r\n  \"etag\": \"W/\\\"81c0f1d0-883f-4cb4-9746-7bd054eba38a\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"addressPrefix\": \"10.0.1.0/24\",\r\n    \"networkSecurityGroup\": {\r\n      \"id\": \"/subscriptions/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/resourceGroups/xplatTestGCreateSubnet/providers/Microsoft.Network/networkSecurityGroups/xplatTestNsg\"\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '581',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"81c0f1d0-883f-4cb4-9746-7bd054eba38a"',
  'x-ms-request-id': 'b7a5087a-8086-4d21-8b3c-ddec391fdb44',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14958',
  'x-ms-correlation-request-id': '8da72bda-8037-4526-8d00-d156691eb685',
  'x-ms-routing-request-id': 'SOUTHEASTASIA:20150521T080838Z:8da72bda-8037-4526-8d00-d156691eb685',
  date: 'Thu, 21 May 2015 08:08:38 GMT',
  connection: 'close' });
 return result; }]];