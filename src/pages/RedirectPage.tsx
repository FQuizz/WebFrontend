import { useEffect } from "react";
import { useParams } from "react-router";

export default function RedirectPage() {
  const params = useParams();
  useEffect(() => {
    window.location.href = `http://localhost:8082/shortlinks/${params.shortCode}`;
  }, [params.shortCode]);
  return <div></div>;
}
