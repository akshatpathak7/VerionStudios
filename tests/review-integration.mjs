// Run against a local production server with development storage credentials.
// All test records are deleted in finally; no real review data is read.
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { get, del } from '@vercel/blob';
const base = process.env.REVIEW_TEST_ORIGIN || 'http://localhost:3001';
assert.ok(['localhost','127.0.0.1'].includes(new URL(base).hostname),'Use a local test server.');
const token=process.env.BLOB_READ_WRITE_TOKEN;
assert.ok(token,'Development Blob token is required.');
const ids=[];
const post=(data,origin=base)=>fetch(base+'/api/reviews',{method:'POST',headers:{'Content-Type':'application/json','Origin':origin},body:JSON.stringify(data)});
try {
 for (const consent of [false,true]) {
  const id=randomUUID(); ids.push(id);
  const input={submissionId:id,name:consent?'Integration test':'',affiliation:consent?'Temporary test record':'',service:'Test service',review:'Integration test of private review storage. Removed after verification.',publicationConsent:consent,website:''};
  const response=await post(input); const result=await response.json();
  assert.equal(response.status,201,JSON.stringify(result));assert.equal(result.receipt,id);
  const stored=await get(`reviews/${id}.json`,{access:'private',token,useCache:false});
  assert.equal(stored?.statusCode,200);
  const record=await new Response(stored.stream).json();
  assert.equal(record.name,input.name||null);assert.equal(record.affiliation,input.affiliation||null);
  assert.equal(record.service,input.service);assert.equal(record.review,input.review);
  assert.equal(record.publicationConsent,consent);assert.equal(record.moderationStatus,'pending');assert.equal(record.featured,false);
  const publicRead=await fetch(stored.blob.url);assert.ok([401,403,404].includes(publicRead.status),`Unexpected public access: ${publicRead.status}`);
  assert.equal((await post(input)).status,200,'Retry should be idempotent.');
  assert.equal((await post({...input,review:'Changed text using the same reference.'})).status,409);
  assert.equal((await post({...input,review:' '})).status,400);
  assert.equal((await post({...input,website:'spam.example'})).status,400);
  assert.equal((await post(input,'https://unrelated.example')).status,403);
  assert.equal((await post({...input,review:'x'.repeat(25000)})).status,413);
 }
 assert.equal((await fetch(base+'/api/reviews')).status,405,'No public read endpoint.');
 console.log('Passed: private persistence, optional identity, consent, pending moderation, retry protection, validation, origin checks, size limit, and no public reads.');
} finally {
 await Promise.all(ids.map(id=>del(`reviews/${id}.json`,{token})));
 console.log('Temporary review records removed.');
}
