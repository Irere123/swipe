import { Formik } from "formik";
import React from "react";
import { Button } from "../../components/Button";
import { InputField } from "../../components/form-fields/InputField";
import { Modal } from "../../components/Modal";
import { useConn } from "../../shared-hooks/useConn";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const EditProfileModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
}) => {
  const me = useConn().user;
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} title="Edit profile">
      <Formik
        initialValues={{
          displayName: me.displayName,
          bio: me.bio,
        }}
        onSubmit={() => {}}
      >
        {({ values }) => (
          <div>
            <InputField
              name="displayName"
              label="Display name"
              autoComplete="off"
              value={values.displayName}
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
              <Button>Save</Button>
              <Button color="secondary">Cancel</Button>
            </div>
          </div>
        )}
      </Formik>
    </Modal>
  );
};
