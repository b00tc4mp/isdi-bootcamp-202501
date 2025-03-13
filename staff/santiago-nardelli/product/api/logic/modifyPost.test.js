import { modifyPost } from './modifyPost.js';

try {
  const postToModify = modifyPost('m7yy45qb-rv1cg9xnbg','m7yy5inv-mif332ssjcf','https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtwNXA2dTJra2dycXVhbTNvYWt6djkzemxxamRtZXY3MWVhbnl3ZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/oOHh55zKsGxfZ46Uxu/giphy.gif','GOD');
  console.log(postToModify);
} catch (error) {
  console.error(error);
  
}