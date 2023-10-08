"use client";

import { useRouter } from "next/navigation";
import { Modal } from "../../_components/modal";

export default function Comment() {
  const router = useRouter();
  return (
    <Modal>
      <span onClick={() => router.back()}>Close</span>
      <h1>Leave a comment</h1>
    </Modal>
  );
}
