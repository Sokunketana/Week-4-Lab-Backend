export class Middleware {
  static log(req, res, next) {
    console.log(req.method);
    console.log(req.url);
    console.log(req.query);
    console.log(`${new Date().toISOString()}`);
    next();
  }

  static creditErrorHandler(req, res, next) {
    const { minCredits, maxCredits } = req.query;

    if (minCredits !== undefined && isNaN(Number(minCredits))) {
      return res.status(400).json({ error: "minCredits must be a number" });
    }

    if (maxCredits !== undefined && isNaN(Number(maxCredits))) {
      return res.status(400).json({ error: "maxCredits must be a number" });
    }

    if (minCredits !== undefined && !Number.isInteger(Number(minCredits))) {
      return res.status(400).json({ error: "minCredits must be an integer" });
    }

    if (maxCredits !== undefined && !Number.isInteger(Number(maxCredits))) {
      return res.status(400).json({ error: "maxCredits must be an integer" });
    }

    if (
      minCredits !== undefined &&
      maxCredits !== undefined &&
      Number(minCredits) > Number(maxCredits)
    ) {
      return res
        .status(400)
        .json({ error: "minCredits cannot be greater than maxCredits" });
    }

    next();
  }
}
