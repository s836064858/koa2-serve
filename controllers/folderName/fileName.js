import responseData from '../../config/response.js'
const { successData } = responseData
export default {
  'GET test': test
}

function test(ctx) {
  ctx.body = successData('1')
}
