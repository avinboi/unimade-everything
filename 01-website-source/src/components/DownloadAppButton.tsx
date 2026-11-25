type Props = {
  className?: string;
};

export function DownloadAppButton({ className = "" }: Props) {
  return (
    <button type="button" className={`btn-primary ${className}`.trim()}>
      Download the app
    </button>
  );
}
