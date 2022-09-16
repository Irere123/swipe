import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { Button } from "../components/Button";
import { InputField } from "../components/InputField";
import { Text } from "../components/Text";
import { MainLayout } from "../modules/layouts/MainLayout";
import { MeContext } from "../utils/UserProvider";
import { mutation } from "../utils/mutation";
import { useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";
import { BaseUser } from "../../types";

const AccountSetup: React.FC = () => {
  const { me } = useContext(MeContext);
  const queryClient = useQueryClient();
  const { push } = useHistory();

  return (
    <MainLayout>
      <div className="flex flex-col flex-1 mb-3">
        <Text variant="pageHeading">Edit profile</Text>
        <Formik
          initialValues={{
            id: me?.id,
            username: me?.username,
            displayName: me?.displayName,
            bio: me?.bio || "",
            location: me?.location || "",
          }}
          onSubmit={async (data) => {
            const resp = await mutation("/u/edit", data, { method: "POST" });

            queryClient.setQueryData<
              | { user: BaseUser | null; leaderboard: BaseUser[] }
              | null
              | undefined
            >("/me", (x) =>
              !x
                ? x
                : {
                    ...x,
                    user: resp,
                  }
            );
            push("/");
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div className="flex flex-col gap-3">
                <InputField
                  name="username"
                  label="Name"
                  placeholder="what is your name"
                  value={values.username}
                />
                <InputField
                  name="displayName"
                  label="Display name"
                  value={values.displayName}
                />
                <InputField
                  name="bio"
                  label="About"
                  placeholder="Tell us more about you"
                  textarea
                  rows={3}
                  value={values.bio}
                />
                <InputField
                  name="location"
                  label="Location"
                  value={values.location}
                  placeholder="Where do you live?"
                />

                <div>
                  <Button type="submit" disabled={isSubmitting}>
                    Save
                  </Button>
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
