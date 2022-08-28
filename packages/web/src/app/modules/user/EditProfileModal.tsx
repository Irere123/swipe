import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { Button } from "../../components/Button";
import { InputField } from "../../components/form-fields/InputField";
import { Modal } from "../../components/Modal";
import { useConn } from "../../shared-hooks/useConn";
import { useTypeSafeMutation } from "../../shared-hooks/useTypeSafeMutation";
import { WebSocketContext } from "../ws/WebSocketProvider";

interface Props {
  onEdit: (data: { bio: string; username: string }) => void;
  isOpen: boolean;
  onRequestClose: () => void;
}

export const EditProfileModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  onEdit,
}) => {
  const { conn, setUser } = useContext(WebSocketContext);
  const { mutateAsync } = useTypeSafeMutation("editProfile");
  if (!conn) {
    return null;
  }

  const user = conn.user;
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} title="Edit profile">
      <Formik
        initialValues={{
          username: user.username,
          bio: user.bio,
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validate={({ bio, username }) => {
          if (bio.length < 30 || bio.length > 500) {
            return {
              error: "There is an error with this",
            };
          }
        }}
        onSubmit={async (data) => {
          await mutateAsync([data]);

          if (conn) {
            setUser({
              ...conn.user,
              ...data,
              bio: data.bio.trim(),
              username: data.username.trim(),
            });
          }
          onEdit(data);
          onRequestClose();
        }}
      >
        {({ values }) => (
          <Form className="flex flex-col gap-2">
            <InputField
              name="username"
              label="Display name"
              autoComplete="off"
              value={values.username}
              minLength={6}
              maxLength={60}
            />
            <InputField
              name="bio"
              label="About"
              value={values.bio}
              minLength={30}
              maxLength={500}
              textarea={true}
              rows={4}
            />
            <div className="flex gap-3 mt-3">
              <Button type="submit">Save</Button>
              <Button color="secondary" type="button">
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
