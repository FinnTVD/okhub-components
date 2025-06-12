export default function Iframe({ src }: { src: string }) {
  return <iframe src={src} className="w-full h-screen"></iframe>;
}
