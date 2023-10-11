export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return <div className=" w-full h-full">{children}</div>;
}
