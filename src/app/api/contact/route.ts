/**
 * Backward-compatible contact endpoint.
 * Delegates to the enquiries API handler.
 */
export const dynamic = "force-dynamic";
export { POST } from "@/app/api/enquiries/route";
