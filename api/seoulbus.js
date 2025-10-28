import { parseStringPromise } from 'xml2js';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const { busRouteId } = req.query;
//    const serviceKey = process.env.SERVICE_KEY;

    const url = `http://ws.bus.go.kr/api/rest/buspos/getBusPosByRtid?serviceKey=a4f701fae9506f77b448ae7943abfe4dc91f1bee0c7625bd4f4531c992ff510c&busRouteId=${busRouteId}`;

    const response = await fetch(url);
    const xml = await response.text();

    const json = await parseStringPromise(xml, { explicitArray: false });

    res.status(200).json(json);

  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
}
