import { Form, Formik } from "formik";
import React, { useContext } from "react";
import {} from "@swipe/ui/icons";
import { Button } from "../components/Button";
import { InputField } from "../components/InputField";
import { NativeRadio } from "../components/NativeRadio";
import { Text } from "../components/Text";
import { MainLayout } from "../modules/layouts/MainLayout";
import { MeContext } from "../utils/UserProvider";

const AccountSetup: React.FC = () => {
  const { me } = useContext(MeContext);

  return (
    <MainLayout>
      <div className="flex flex-col flex-1 mb-3">
        <Text variant="pageHeading">Edit profile</Text>
        <Formik
          initialValues={{
            username: me?.username,
            displayName: me?.displayName,
            bio: me?.bio,
            location: me?.location,
            birthday: me?.birthday,
            goal: me?.goal,
          }}
          onSubmit={() => {}}
        >
          {() => (
            <Form>
              <div className="flex flex-col gap-3">
                <InputField
                  name="username"
                  label="Name"
                  placeholder="what is your name"
                />
                <InputField name="displayName" label="Display name" />
                <InputField
                  name="bio"
                  label="About"
                  placeholder="Tell us more about you"
                  textarea
                  rows={3}
                />
                <InputField
                  name="location"
                  label="Location"
                  placeholder="Where do you live?"
                />

                <div>
                  <Button>Save</Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
};

export default AccountSetup;
