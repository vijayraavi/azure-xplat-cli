// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: 'ce4a7590-4722-4bcf-a2c6-e473e9f11778',
    name: 'Azure Storage DM Test',
    user: {
      name: 'user@domain.example',
      type: 'user'
    },
    tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47',
    state: 'Enabled',
    registeredProviders: [],
    _eventsCount: '1',
    isDefault: true
  }, newProfile.environments['AzureCloud']));

  return newProfile;
};

exports.setEnvironment = function() {
  process.env['AZURE_VM_TEST_LOCATION'] = 'southeastasia';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .delete('/subscriptions/ce4a7590-4722-4bcf-a2c6-e473e9f11778/resourceGroups/xplatTstVmssGCreate5906/providers/Microsoft.Compute/virtualMachineScaleSets/xplattestvmss5?api-version=2016-04-30-preview')
  .reply(202, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '0',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/ce4a7590-4722-4bcf-a2c6-e473e9f11778/providers/Microsoft.Compute/locations/southeastasia/operations/9b6a88e8-f3ee-48d3-ad43-e901bd2d893b?monitor=true&api-version=2016-04-30-preview',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/ce4a7590-4722-4bcf-a2c6-e473e9f11778/providers/Microsoft.Compute/locations/southeastasia/operations/9b6a88e8-f3ee-48d3-ad43-e901bd2d893b?api-version=2016-04-30-preview',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': '7d05390c-5dc5-4a14-8588-dcae1a33dd6b_131292456099219588',
  'x-ms-request-id': '9b6a88e8-f3ee-48d3-ad43-e901bd2d893b',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1197',
  'x-ms-correlation-request-id': 'a242cf92-4ad2-4ce5-9a20-220b9e48b214',
  'x-ms-routing-request-id': 'EASTASIA:20170216T100237Z:a242cf92-4ad2-4ce5-9a20-220b9e48b214',
  date: 'Thu, 16 Feb 2017 10:02:36 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .delete('/subscriptions/ce4a7590-4722-4bcf-a2c6-e473e9f11778/resourceGroups/xplatTstVmssGCreate5906/providers/Microsoft.Compute/virtualMachineScaleSets/xplattestvmss5?api-version=2016-04-30-preview')
  .reply(202, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '0',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/ce4a7590-4722-4bcf-a2c6-e473e9f11778/providers/Microsoft.Compute/locations/southeastasia/operations/9b6a88e8-f3ee-48d3-ad43-e901bd2d893b?monitor=true&api-version=2016-04-30-preview',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/ce4a7590-4722-4bcf-a2c6-e473e9f11778/providers/Microsoft.Compute/locations/southeastasia/operations/9b6a88e8-f3ee-48d3-ad43-e901bd2d893b?api-version=2016-04-30-preview',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': '7d05390c-5dc5-4a14-8588-dcae1a33dd6b_131292456099219588',
  'x-ms-request-id': '9b6a88e8-f3ee-48d3-ad43-e901bd2d893b',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1197',
  'x-ms-correlation-request-id': 'a242cf92-4ad2-4ce5-9a20-220b9e48b214',
  'x-ms-routing-request-id': 'EASTASIA:20170216T100237Z:a242cf92-4ad2-4ce5-9a20-220b9e48b214',
  date: 'Thu, 16 Feb 2017 10:02:36 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/ce4a7590-4722-4bcf-a2c6-e473e9f11778/providers/Microsoft.Compute/locations/southeastasia/operations/9b6a88e8-f3ee-48d3-ad43-e901bd2d893b?api-version=2016-04-30-preview')
  .reply(200, "{\r\n  \"startTime\": \"2017-02-16T10:02:38.288283+00:00\",\r\n  \"status\": \"InProgress\",\r\n  \"name\": \"9b6a88e8-f3ee-48d3-ad43-e901bd2d893b\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '133',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': '7d05390c-5dc5-4a14-8588-dcae1a33dd6b_131292456099219588',
  'x-ms-request-id': 'aa596a23-0579-483c-b280-fd8d13e2d682',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14968',
  'x-ms-correlation-request-id': '8c7e2ecd-625b-432a-871c-ac92d233e4e3',
  'x-ms-routing-request-id': 'EASTASIA:20170216T100307Z:8c7e2ecd-625b-432a-871c-ac92d233e4e3',
  date: 'Thu, 16 Feb 2017 10:03:07 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/ce4a7590-4722-4bcf-a2c6-e473e9f11778/providers/Microsoft.Compute/locations/southeastasia/operations/9b6a88e8-f3ee-48d3-ad43-e901bd2d893b?api-version=2016-04-30-preview')
  .reply(200, "{\r\n  \"startTime\": \"2017-02-16T10:02:38.288283+00:00\",\r\n  \"status\": \"InProgress\",\r\n  \"name\": \"9b6a88e8-f3ee-48d3-ad43-e901bd2d893b\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '133',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': '7d05390c-5dc5-4a14-8588-dcae1a33dd6b_131292456099219588',
  'x-ms-request-id': 'aa596a23-0579-483c-b280-fd8d13e2d682',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14968',
  'x-ms-correlation-request-id': '8c7e2ecd-625b-432a-871c-ac92d233e4e3',
  'x-ms-routing-request-id': 'EASTASIA:20170216T100307Z:8c7e2ecd-625b-432a-871c-ac92d233e4e3',
  date: 'Thu, 16 Feb 2017 10:03:07 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/ce4a7590-4722-4bcf-a2c6-e473e9f11778/providers/Microsoft.Compute/locations/southeastasia/operations/9b6a88e8-f3ee-48d3-ad43-e901bd2d893b?api-version=2016-04-30-preview')
  .reply(200, "{\r\n  \"startTime\": \"2017-02-16T10:02:38.288283+00:00\",\r\n  \"status\": \"InProgress\",\r\n  \"name\": \"9b6a88e8-f3ee-48d3-ad43-e901bd2d893b\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '133',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': '7d05390c-5dc5-4a14-8588-dcae1a33dd6b_131292456099219588',
  'x-ms-request-id': '7db1d3dc-5f9f-48bf-8c73-e65f07813020',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14964',
  'x-ms-correlation-request-id': '7b7f6625-dee3-40d3-8b3c-ea6411206c64',
  'x-ms-routing-request-id': 'EASTASIA:20170216T100338Z:7b7f6625-dee3-40d3-8b3c-ea6411206c64',
  date: 'Thu, 16 Feb 2017 10:03:37 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/ce4a7590-4722-4bcf-a2c6-e473e9f11778/providers/Microsoft.Compute/locations/southeastasia/operations/9b6a88e8-f3ee-48d3-ad43-e901bd2d893b?api-version=2016-04-30-preview')
  .reply(200, "{\r\n  \"startTime\": \"2017-02-16T10:02:38.288283+00:00\",\r\n  \"status\": \"InProgress\",\r\n  \"name\": \"9b6a88e8-f3ee-48d3-ad43-e901bd2d893b\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '133',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': '7d05390c-5dc5-4a14-8588-dcae1a33dd6b_131292456099219588',
  'x-ms-request-id': '7db1d3dc-5f9f-48bf-8c73-e65f07813020',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14964',
  'x-ms-correlation-request-id': '7b7f6625-dee3-40d3-8b3c-ea6411206c64',
  'x-ms-routing-request-id': 'EASTASIA:20170216T100338Z:7b7f6625-dee3-40d3-8b3c-ea6411206c64',
  date: 'Thu, 16 Feb 2017 10:03:37 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/ce4a7590-4722-4bcf-a2c6-e473e9f11778/providers/Microsoft.Compute/locations/southeastasia/operations/9b6a88e8-f3ee-48d3-ad43-e901bd2d893b?api-version=2016-04-30-preview')
  .reply(200, "{\r\n  \"startTime\": \"2017-02-16T10:02:38.288283+00:00\",\r\n  \"status\": \"InProgress\",\r\n  \"name\": \"9b6a88e8-f3ee-48d3-ad43-e901bd2d893b\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '133',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': '7d05390c-5dc5-4a14-8588-dcae1a33dd6b_131292456099219588',
  'x-ms-request-id': 'd5e6b2c7-4af3-4a9a-afe4-67501e8719e8',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14977',
  'x-ms-correlation-request-id': 'b8f56c3f-6f34-4d25-ac9d-d00c80511b87',
  'x-ms-routing-request-id': 'EASTASIA:20170216T100408Z:b8f56c3f-6f34-4d25-ac9d-d00c80511b87',
  date: 'Thu, 16 Feb 2017 10:04:07 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/ce4a7590-4722-4bcf-a2c6-e473e9f11778/providers/Microsoft.Compute/locations/southeastasia/operations/9b6a88e8-f3ee-48d3-ad43-e901bd2d893b?api-version=2016-04-30-preview')
  .reply(200, "{\r\n  \"startTime\": \"2017-02-16T10:02:38.288283+00:00\",\r\n  \"status\": \"InProgress\",\r\n  \"name\": \"9b6a88e8-f3ee-48d3-ad43-e901bd2d893b\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '133',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': '7d05390c-5dc5-4a14-8588-dcae1a33dd6b_131292456099219588',
  'x-ms-request-id': 'd5e6b2c7-4af3-4a9a-afe4-67501e8719e8',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14977',
  'x-ms-correlation-request-id': 'b8f56c3f-6f34-4d25-ac9d-d00c80511b87',
  'x-ms-routing-request-id': 'EASTASIA:20170216T100408Z:b8f56c3f-6f34-4d25-ac9d-d00c80511b87',
  date: 'Thu, 16 Feb 2017 10:04:07 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/ce4a7590-4722-4bcf-a2c6-e473e9f11778/providers/Microsoft.Compute/locations/southeastasia/operations/9b6a88e8-f3ee-48d3-ad43-e901bd2d893b?api-version=2016-04-30-preview')
  .reply(200, "{\r\n  \"startTime\": \"2017-02-16T10:02:38.288283+00:00\",\r\n  \"status\": \"InProgress\",\r\n  \"name\": \"9b6a88e8-f3ee-48d3-ad43-e901bd2d893b\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '133',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': '7d05390c-5dc5-4a14-8588-dcae1a33dd6b_131292456099219588',
  'x-ms-request-id': 'c6502cac-b94c-4bd6-99ac-662746325316',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14971',
  'x-ms-correlation-request-id': '41440ac3-8a14-4c41-ac47-1918131f1845',
  'x-ms-routing-request-id': 'EASTASIA:20170216T100438Z:41440ac3-8a14-4c41-ac47-1918131f1845',
  date: 'Thu, 16 Feb 2017 10:04:37 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/ce4a7590-4722-4bcf-a2c6-e473e9f11778/providers/Microsoft.Compute/locations/southeastasia/operations/9b6a88e8-f3ee-48d3-ad43-e901bd2d893b?api-version=2016-04-30-preview')
  .reply(200, "{\r\n  \"startTime\": \"2017-02-16T10:02:38.288283+00:00\",\r\n  \"status\": \"InProgress\",\r\n  \"name\": \"9b6a88e8-f3ee-48d3-ad43-e901bd2d893b\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '133',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': '7d05390c-5dc5-4a14-8588-dcae1a33dd6b_131292456099219588',
  'x-ms-request-id': 'c6502cac-b94c-4bd6-99ac-662746325316',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14971',
  'x-ms-correlation-request-id': '41440ac3-8a14-4c41-ac47-1918131f1845',
  'x-ms-routing-request-id': 'EASTASIA:20170216T100438Z:41440ac3-8a14-4c41-ac47-1918131f1845',
  date: 'Thu, 16 Feb 2017 10:04:37 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/ce4a7590-4722-4bcf-a2c6-e473e9f11778/providers/Microsoft.Compute/locations/southeastasia/operations/9b6a88e8-f3ee-48d3-ad43-e901bd2d893b?api-version=2016-04-30-preview')
  .reply(200, "{\r\n  \"startTime\": \"2017-02-16T10:02:38.288283+00:00\",\r\n  \"endTime\": \"2017-02-16T10:04:49.2465064+00:00\",\r\n  \"status\": \"Succeeded\",\r\n  \"name\": \"9b6a88e8-f3ee-48d3-ad43-e901bd2d893b\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '183',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': '7d05390c-5dc5-4a14-8588-dcae1a33dd6b_131292456099219588',
  'x-ms-request-id': 'd11f7130-0604-4473-bf5e-63a93a1605dc',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14978',
  'x-ms-correlation-request-id': '8d068dcd-647e-4f4b-b144-df776e9a24e2',
  'x-ms-routing-request-id': 'EASTASIA:20170216T100508Z:8d068dcd-647e-4f4b-b144-df776e9a24e2',
  date: 'Thu, 16 Feb 2017 10:05:08 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/ce4a7590-4722-4bcf-a2c6-e473e9f11778/providers/Microsoft.Compute/locations/southeastasia/operations/9b6a88e8-f3ee-48d3-ad43-e901bd2d893b?api-version=2016-04-30-preview')
  .reply(200, "{\r\n  \"startTime\": \"2017-02-16T10:02:38.288283+00:00\",\r\n  \"endTime\": \"2017-02-16T10:04:49.2465064+00:00\",\r\n  \"status\": \"Succeeded\",\r\n  \"name\": \"9b6a88e8-f3ee-48d3-ad43-e901bd2d893b\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '183',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': '7d05390c-5dc5-4a14-8588-dcae1a33dd6b_131292456099219588',
  'x-ms-request-id': 'd11f7130-0604-4473-bf5e-63a93a1605dc',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14978',
  'x-ms-correlation-request-id': '8d068dcd-647e-4f4b-b144-df776e9a24e2',
  'x-ms-routing-request-id': 'EASTASIA:20170216T100508Z:8d068dcd-647e-4f4b-b144-df776e9a24e2',
  date: 'Thu, 16 Feb 2017 10:05:08 GMT',
  connection: 'close' });
 return result; }]];