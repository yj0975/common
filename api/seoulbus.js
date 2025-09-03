import { parseStringPromise } from 'xml2js';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const { routeNo } = req.query;
    const serviceKey = process.env.SERVICE_KEY;

    const url = `http://ws.bus.go.kr/api/rest/busRouteInfo/getBusRouteList?serviceKey=${serviceKey}&strSrch=${routeNo}`;

    const response = await fetch(url);
    const xml = await response.text();

    const json = await parseStringPromise(xml);

    res.status(200).json(json);

  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
}
