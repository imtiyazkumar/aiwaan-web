
import { useMutation } from "@tanstack/react-query";
import ContactAPI from "./contactAPI";

const useMutationCreateContact = () => {
    return useMutation({
        mutationFn: ContactAPI.create,
    });
};

const ContactQuery = {
    useMutationCreateContact
};

export default ContactQuery;
