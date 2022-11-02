var fs = require('fs');

// improve path mapping
async function ParseLine(line, enforceOn) {
  const lineList = line.split(/(\s+)/).filter(e => { return e.trim().length > 0; });
  const linePath = lineList[0]
  if (enforceOn.includes(linePath)){
    const result = {
        "paths": [linePath],
        "teams": lineList.slice(1)
    }
    return result
  }

  return null
}

async function ParseCodeOwners(data, enforceOn) {
  const dataArray = data.split('\n');
  const result = await Promise.all(dataArray.map(async i => ParseLine(i, enforceOn)));

  return result.filter(value => !!value);
}

module.exports = ParseCodeOwners;