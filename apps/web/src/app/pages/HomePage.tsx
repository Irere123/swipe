import { Component } from "solid-js";
import avatar from "../../assets/avatar.jpg";
import { Button } from "../components/Button";
import { UserAvatar } from "../components/UserAvatar";
import { MainLayout } from "../modules/layouts/MainLayout";

const HomePage: Component = () => {
  return (
    <MainLayout>
      <div class="flex flex-col">
        {Array.from([1, 3, 4, 5, 6, 7, 6, 6]).map(() => (
          <div class="flex gap-3 border-b-2 border-primary-dark mt-3">
            <div>
              <UserAvatar src={avatar} size="md" isOnline={true} />
            </div>
            <div class="w-300">
              <div>
                <p class="font-bold">
                  Badaralsafar{" "}
                  <span class="bg-accent text-button px-3 rounded">25</span>
                </p>
                <p>Lorem ipsum dolor sit amet consectetur</p>
              </div>
              <div class="bg-accent-disabled h-400 p-3 mt-3 rounded-lg mb-4">
                <p>jj</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default HomePage;
