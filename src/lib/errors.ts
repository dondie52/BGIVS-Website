export const PublicMessages = {
  validation: "Please review the highlighted fields.",
  rateLimit: "Too many requests have been submitted. Please try again later.",
  server: "We could not submit your enquiry at this time. Please try again.",
  enquirySuccess: "Thank you. Your enquiry has been received.",
  bookRequestSuccess:
    "Thank you. Your publication request has been received.",
  bookRequestServer:
    "We could not submit your publication request at this time. Please try again.",
} as const;

export function createErrorId(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 10);
}
