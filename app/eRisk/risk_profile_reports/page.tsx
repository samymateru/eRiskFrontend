"use client";
import { UserMultiSelector } from "@/components/select/user_multi-select";
// import { Tester } from "../risk_management_plan/_risk_management_plan/form/activity-form";

const allUsers = [
    {
        name: "Samwel Materu",
        email: "samymateru@gmail.com",
        image: "https://github.com/shadcn.png",
    },
    {
        name: "Materu Samwel",
        email: "materu@gmail.com",
        image: "https://github.com/shadcn.png",
    },
    {
        name: "Regina Materu",
        email: "regina@gmail.com",
        image: "https://github.com/shadcn.png",
    },
];


export default function RiskProfile() {
  const users = [
    {
      user_id: "123",
      name: "Regina Materu",
      email: "regina@gmail.com",
      image: "https://github.com/shadcn.png",
    },
  ];

  return (
    <div className=" w-full h-full flex items-center justify-center">
      <div className="w-[400px]">
        <UserMultiSelector
          allUsers={allUsers}
          title="Select Users"
          options={users}
          onValueChange={(data) => console.log(data)}
        />
      </div>
    </div>
  );
}
