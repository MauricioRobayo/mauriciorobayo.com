// interface PostDateProps {
//   date: Date;
//   className: string;
// }
// export function PostDate({ date, className }: PostDateProps) {
//   return (
//     <time className={className} dateTime={date.toISOString()}>
//       {formatDate(date)}
//     </time>
//   );
// }

const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

export function formatDate(date: Date | number) {
  return dateFormatter.format(date);
}
