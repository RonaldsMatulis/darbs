const Bin = require('../models/binModel');

exports.optimizeRoutes = async (req, res) => {
  try {
    const bins = await Bin.find({ status: 'full' });
    if (!bins.length) {
      return res.status(200).send({ message: 'Nav pilnu tvertņu maršruta optimizēšanai' });
    }

    // Vienkāršs tuvāko kaimiņu algoritms
    const optimizedRoute = nearestNeighborAlgorithm(bins);
    res.status(200).send({ optimizedRoute });
  } catch (error) {
    res.status(500).send({ message: 'Kļūda optimizējot maršrutu' });
  }
};

function nearestNeighborAlgorithm(bins) {
  const route = [];
  let currentBin = bins[0];
  route.push(currentBin);
  bins.splice(0, 1);

  while (bins.length) {
    let nearestBin = bins[0];
    let minDistance = getDistance(currentBin, nearestBin);

    for (let i = 1; i < bins.length; i++) {
      const distance = getDistance(currentBin, bins[i]);
      if (distance < minDistance) {
        nearestBin = bins[i];
        minDistance = distance;
      }
    }

    currentBin = nearestBin;
    route.push(currentBin);
    bins.splice(bins.indexOf(currentBin), 1);
  }

  return route;
}

function getDistance(bin1, bin2) {
  // Izmantojiet Haversine formula vai vienkāršu Eiklīda attālumu
  const dx = bin1.location.lat - bin2.location.lat;
  const dy = bin1.location.lng - bin2.location.lng;
  return Math.sqrt(dx * dx + dy * dy);
}
