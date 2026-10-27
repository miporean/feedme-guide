import { json } from '../../_lib/db.js';

export function onRequestGet({ data }) {
  return json({ email: data.admin.email });
}
