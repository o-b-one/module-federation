const localEndpoints = {
  "feed": 'http://localhost:4201/remoteEntry.js',
  "user": 'http://localhost:4202/remoteEntry.js',
  "login": 'http://localhost:4203/remoteEntry.js',
  "navigationBar": 'http://localhost:4204/remoteEntry.js',
}

const prodEndpoints = {
  "feed": '../feed/remoteEntry.js',
  "user": '../user/remoteEntry.js',
  "login": '../login/remoteEntry.js',
  "navigationBar": '../navigationBar/remoteEntry.js',
}

function normalizeMappings(endpoints) {
  const mappings = {};
  Object.entries(endpoints).forEach(value => mappings[value[0]] = value[0]+'@'+ value[1])
  return mappings;
}

function getEndpoints(env){
  console.log(env)
  const endpoints = env.toLowerCase() === 'production'
    ? prodEndpoints
    : localEndpoints;
  return normalizeMappings(endpoints);
}



module.exports = {
  getEndpoints
}
