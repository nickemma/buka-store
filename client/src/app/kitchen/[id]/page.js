import Kitchen from "@/components/Kitchen";
import React from "react";

function page({params}) {
  const {id} = params
  return (
    <div>
      <Kitchen id={id}/>
    </div>
  );
}

export default page;
