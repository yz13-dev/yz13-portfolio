import { redirect } from "react-router";


export const loader = async () => {
  return redirect("https://blog.yz13.ru");
}

export default function () {
  return null;
}
