import { parseStringPromise } from 'xml2js';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const serviceKey = process.env.SERVICE_KEY;
    const queryParams = req.query;

    const searchParams = new URLSearchParams(queryParams);
    const finalUrl = `http://ws.bus.go.kr/api/rest/stationinfo/getRouteByStation?serviceKey=${serviceKey}&${searchParams.toString()}`;

    const response = await fetch(finalUrl);
    const xml = await response.text();

    const json = await parseStringPromise(xml, { explicitArray: false });

    res.status(200).json(json);

  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
}
