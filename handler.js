const middy = require('middy')
const correlationIds = require('@perform/lambda-powertools-middleware-correlation-ids')
const stopInfiniteLoop = require('@perform/lambda-powertools-middleware-stop-infinite-loop')
const Lambda = require('@perform/lambda-powertools-lambda-client')

module.exports.hello = middy(async (event) => {
  await Lambda.invoke({
    FunctionName: process.env.AWS_LAMBDA_FUNCTION_NAME,
    InvocationType: 'Event',
    Payload: JSON.stringify(event)
  }).promise()
}).use(correlationIds({ sampleDebugLogRate: 1 }))
.use(stopInfiniteLoop(3)) // allow max call chain length of 3