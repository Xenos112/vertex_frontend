export default async function copyPostUrl(id: string) {
  try {
    const url = `${window.location.origin}/post/${id}`;
    await navigator.clipboard.writeText(url);
    return true;
  } catch (error) {
    return false;
  }
}
