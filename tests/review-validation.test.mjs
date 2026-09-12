import test from 'node:test';
import assert from 'node:assert/strict';
import { reviewSchema } from '../lib/review-validation.ts';
const sample = {submissionId:'b9dc4045-66e1-4e14-8236-ae2895d6c7c5',name:'',affiliation:'',service:'Podcast editing',review:'Clear communication and careful editing.',publicationConsent:false};
test('name and affiliation can be omitted by the visitor',()=>{
 const result=reviewSchema.parse(sample);
 assert.equal(result.name,''); assert.equal(result.affiliation,''); assert.equal(result.publicationConsent,false);
});
test('trims user text and preserves consent choice',()=>{
 const result=reviewSchema.parse({...sample,name:'  Sam  ',review:'  Helpful feedback and a careful edit.  ',publicationConsent:true});
 assert.equal(result.name,'Sam');assert.equal(result.review,'Helpful feedback and a careful edit.');assert.equal(result.publicationConsent,true);
});
test('rejects blank and oversized required text',()=>{
 for(const patch of [{service:' '},{review:'short'},{review:'x'.repeat(5001)},{name:'x'.repeat(101)},{affiliation:'x'.repeat(161)}]) assert.equal(reviewSchema.safeParse({...sample,...patch}).success,false);
});
test('rejects forged server fields and coerced consent',()=>{
 for(const patch of [{featured:true},{moderationStatus:'approved'},{publicationConsent:'true'},{submissionId:'invalid'}]) assert.equal(reviewSchema.safeParse({...sample,...patch}).success,false);
});
