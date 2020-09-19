import moment from 'moment';

export default function parseDuration(duration: string): number {
  /* const parsedDuration = moment.duration(duration);
  return moment.utc(parsedDuration.asMilliseconds()).format('H[:]m[:]ss'); */
  return moment.duration(duration).asMilliseconds();
}
