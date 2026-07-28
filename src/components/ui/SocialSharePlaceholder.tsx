type SocialSharePlaceholderProps = {
  title: string;
};

export function SocialSharePlaceholder({ title }: SocialSharePlaceholderProps) {
  return (
    <div className="rounded-lg border border-border bg-off-white px-4 py-3 text-sm text-muted">
      Sharing options for “{title}” will be enabled once official BGIVS social channels are
      confirmed.
    </div>
  );
}
