// Controller for Get /api/ route

module.exports = {
  getIndexData(req, res) {
    console.log({ express: 'Hello From Express' });

    res.send({ express: 'Hello From Express' });
  },
};
