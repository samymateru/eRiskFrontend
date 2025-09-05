import { Button } from "@/components/ui/button";
import { ArrowLeft, CirclePlus, EllipsisVertical } from "lucide-react";
import { NewUser } from "./new_user";

export const PreferenceHeader = () => {
  return (
    <section className="flex items-center justify-center">
      <section className="flex-1">
        <Button className="w-8 h-8 border border-neutral-400" variant="outline">
          <ArrowLeft size={16} />
        </Button>
      </section>
      <section>
        <section></section>
        <section className="flex items-center gap-2">
          <NewUser>
            <Button
              variant="outline"
              className="border border-neutral-400 w-[100px] rounded-full h-7">
              <CirclePlus size={16} />
              User
            </Button>
          </NewUser>

          <Button
            variant="outline"
            className="border border-neutral-400 w-[100px] rounded-full h-7">
            <CirclePlus size={16} />
            Role
          </Button>
          <Button className="w-8 h-8">
            <EllipsisVertical size={16} />
          </Button>
        </section>
      </section>
    </section>
  );
};
