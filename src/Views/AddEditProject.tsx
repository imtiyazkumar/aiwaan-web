import React, { useState, useEffect } from "react";
import { Save, ArrowLeft, Trash2, Upload } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Div } from "../components/general/BaseComponents";
import { Button, FormContainer, FormGroup, FormTitle, Select, TextArea, TextInput } from "../components/UiComponents";
import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { supabase } from "../lib/supabase";

const AddEditProject: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState("");

    const [formData, setFormData] = useState({
        projectName: "",
        projectDescription: "",
        projectType: "",
        address: "",
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        budget: "",
        startDate: "",
        estimatedCompletion: "",
        status: "new",
        imageUrl: "",
    });

    const projectTypeOptions = [
        { value: "residential-interior", label: "Residential Interior" },
        { value: "residential-exterior", label: "Residential Exterior" },
        { value: "commercial-space", label: "Commercial Space" },
        { value: "office-interior", label: "Office Interior" },
        { value: "landscape-design", label: "Landscape Design" },
        { value: "custom-project", label: "Custom Project" },
    ];

    const statusOptions = [
        { value: "new", label: "New" },
        { value: "in-progress", label: "In Progress" },
        { value: "completed", label: "Completed" },
        { value: "on-hold", label: "On Hold" },
    ];

    useEffect(() => {
        const fetchProject = async () => {
            if (isEditMode) {
                try {
                    const projectDoc = await getDoc(doc(db, "projects", id!));
                    if (projectDoc.exists()) {
                        setFormData(projectDoc.data() as typeof formData);
                        setImageUrl(projectDoc.data()?.imageUrl || "");
                    } else {
                        setSubmitError("Project not found");
                        setTimeout(() => navigate("/projects"), 2000);
                    }
                } catch (error) {
                    console.error("Error fetching project:", error);
                    setSubmitError("Failed to load project data");
                }
            }
        };

        fetchProject();
    }, [id, isEditMode, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSelectChange = (id: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleImageUpload = async () => {
        if (!imageFile) return "";


        console.log(imageFile);

        const fileName = `${Date.now()}_${imageFile.name}`;
        const { data, error } = await supabase.storage
            .from("project-images") // Replace with your Supabase storage bucket name
            .upload(fileName, imageFile);

        if (error) {
            console.error("Error uploading image:", error);
            setSubmitError("Failed to upload image");
            return "";
        }

        const { data: publicUrl } = supabase.storage.from("project-images").getPublicUrl(data.path);

        console.log("public", publicUrl);
        return publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError("");

        const { data, error } = await supabase.auth.signInWithPassword({
            email: "imtiyazah907@gmail.com",
            password: "imtiyazah907@gmail.com",
        });

        console.log("data", data, error);

        try {
            const uploadedImageUrl = await handleImageUpload();
            console.log(uploadedImageUrl);

        }
        catch (error) {
            console.error("Error uploading image:", error);
            return "";
        }


        //     const projectData = {
        //         ...formData,
        //         budget: formData.budget ? Number(formData.budget) : 0,
        //         imageUrl: uploadedImageUrl || imageUrl,
        //     };

        //     if (isEditMode) {
        //         await updateDoc(doc(db, "projects", id!), projectData);
        //     } else {
        //         await addDoc(collection(db, "projects"), {
        //             ...projectData,
        //             createdAt: new Date(),
        //         });
        //     }

        //     setSubmitSuccess(true);
        //     setTimeout(() => {
        //         navigate("/projects");
        //     }, 2000);
        //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // } catch (error: any) {
        //     console.error("Error saving project:", error);
        //     setSubmitError("Failed to save project: " + error.message);
        // } finally {
        //     setIsSubmitting(false);
        // }
    };

    const handleDelete = async () => {
        if (!isEditMode || !window.confirm("Are you sure you want to delete this project?")) {
            return;
        }

        try {
            await deleteDoc(doc(db, "projects", id!));
            alert("Project deleted successfully");
            navigate("/projects");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error deleting project:", error);
            setSubmitError("Failed to delete project: " + error.message);
        }
    };

    return (
        // <Div className="mx-auto">
        //     <Div className="relative overflow-hidden rounded-lg">
        //         <Div className="absolute inset-0 bg-gradient-to-r from-secondary-500/90 to-primary-base/80 z-10" />
        //         <Div className="absolute inset-0">
        //             <img
        //                 src="/api/placeholder/1200/300"
        //                 alt="Project Management"
        //                 className="w-full h-full object-cover"
        //             />
        //         </Div>
        //         <Div className="container mx-auto px-6 py-16 relative z-20">
        //             <Div>
        //                 <h1 className="text-32 md:text-48 font-bold text-white leading-tight mb-4">
        //                     {isEditMode ? "Edit" : "Add New"} <span className="text-primary-200">Project</span>
        //                 </h1>
        //                 <p className="text-16 md:text-18 text-neutral-100">
        //                     {isEditMode
        //                         ? "Update the details of your existing project"
        //                         : "Create a new project with all the necessary details"}
        //                 </p>
        //             </Div>
        //         </Div>
        //     </Div>

        //     <Div className="container mx-auto px-4 py-6">
        //         <Button
        //             variant="primary"
        //             onClick={() => navigate("/projects")}
        //             className="text-secondary-600 hover:text-secondary-800"
        //         >
        //             <ArrowLeft size={16} className="mr-2" /> Back to Projects
        //         </Button>
        //     </Div>

        //     <Div className="py-6">
        //         {submitSuccess ? (
        //             <FormContainer className="py-12">
        //                 <Div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        //                     <div className="text-green-500 mx-auto mb-4">✓</div>
        //                     <h3 className="text-20 font-bold text-green-700 mb-2">
        //                         Project {isEditMode ? "Updated" : "Created"} Successfully!
        //                     </h3>
        //                     <p className="text-16 text-green-600 mb-4">
        //                         Redirecting you to the projects page...
        //                     </p>
        //                 </Div>
        //             </FormContainer>
        //         ) : (
        //             <FormContainer>
        //                 <form onSubmit={handleSubmit}>
        //                     <FormTitle
        //                         title={isEditMode ? "Edit" : "New"}
        //                         highlight="Project"
        //                         description={isEditMode
        //                             ? "Update the details of your project"
        //                             : "Fill out the form to create a new project"}
        //                     />

        //                     {submitError && (
        //                         <Div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
        //                             {submitError}
        //                         </Div>
        //                     )}

        //                     <Div className="mb-8">
        //                         <h3 className="text-18 font-semibold text-secondary-700 mb-4 pb-2 border-b border-neutral-200">
        //                             Project Information
        //                         </h3>

        //                         <FormGroup>
        //                             <TextInput
        //                                 id="projectName"
        //                                 label="Project Name"
        //                                 placeholder="Enter project name"
        //                                 value={formData.projectName}
        //                                 onChange={handleInputChange}
        //                                 required
        //                             />
        //                             <Select
        //                                 id="projectType"
        //                                 label="Project Type"
        //                                 options={projectTypeOptions}
        //                                 value={formData.projectType}
        //                                 onChange={(e) => handleSelectChange("projectType", e.target.value)}
        //                                 required
        //                             />
        //                         </FormGroup>

        //                         <Div className="mt-6">
        //                             <TextArea
        //                                 id="projectDescription"
        //                                 label="Project Description"
        //                                 placeholder="Describe your project in detail..."
        //                                 rows={4}
        //                                 value={formData.projectDescription}
        //                                 onChange={handleInputChange}
        //                                 required
        //                             />
        //                         </Div>

        //                         <FormGroup className="mt-6">
        //                             <TextInput
        //                                 id="address"
        //                                 label="Project Location/Address"
        //                                 placeholder="Enter full address"
        //                                 value={formData.address}
        //                                 onChange={handleInputChange}
        //                                 required
        //                             />
        //                             <TextInput
        //                                 id="budget"
        //                                 label="Budget (USD)"
        //                                 placeholder="Estimated budget"
        //                                 type="number"
        //                                 value={formData.budget}
        //                                 onChange={handleInputChange}
        //                             />
        //                         </FormGroup>

        //                         <FormGroup className="mt-6">
        //                             <TextInput
        //                                 id="startDate"
        //                                 label="Start Date"
        //                                 type="date"
        //                                 value={formData.startDate}
        //                                 onChange={handleInputChange}
        //                             />
        //                             <TextInput
        //                                 id="estimatedCompletion"
        //                                 label="Estimated Completion Date"
        //                                 type="date"
        //                                 value={formData.estimatedCompletion}
        //                                 onChange={handleInputChange}
        //                             />
        //                         </FormGroup>

        //                         {isEditMode && (
        //                             <FormGroup className="mt-6">
        //                                 <Select
        //                                     id="status"
        //                                     label="Project Status"
        //                                     options={statusOptions}
        //                                     value={formData.status}
        //                                     onChange={(e) => handleSelectChange("status", e.target.value)}
        //                                 />
        //                             </FormGroup>
        //                         )}
        //                     </Div>

        //                     <Div className="mb-8">
        //                         <h3 className="text-18 font-semibold text-secondary-700 mb-4 pb-2 border-b border-neutral-200">
        //                             Client Information
        //                         </h3>

        //                         <FormGroup>
        //                             <TextInput
        //                                 id="clientName"
        //                                 label="Client Name"
        //                                 placeholder="Client's full name"
        //                                 value={formData.clientName}
        //                                 onChange={handleInputChange}
        //                                 required
        //                             />
        //                             <TextInput
        //                                 id="clientEmail"
        //                                 type="email"
        //                                 label="Client Email"
        //                                 placeholder="client@example.com"
        //                                 value={formData.clientEmail}
        //                                 onChange={handleInputChange}
        //                                 required
        //                             />
        //                         </FormGroup>

        //                         <FormGroup className="mt-6">
        //                             <TextInput
        //                                 id="clientPhone"
        //                                 label="Client Phone"
        //                                 placeholder="+1 234 567 8900"
        //                                 value={formData.clientPhone}
        //                                 onChange={handleInputChange}
        //                                 required
        //                             />
        //                         </FormGroup>
        //                     </Div>

        //                     <Div className="mb-8">
        //                         <h3 className="text-18 font-semibold text-secondary-700 mb-4 pb-2 border-b border-neutral-200">
        //                             Project Image
        //                         </h3>
        //                         <Div>
        //                             <input
        //                                 type="file"
        //                                 accept="image/*"
        //                                 onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        //                             />
        //                             {imageUrl && (
        //                                 <Div className="mt-4">
        //                                     <img src={imageUrl} alt="Project" className="w-32 h-32 object-cover rounded-md" />
        //                                 </Div>
        //                             )}
        //                         </Div>
        //                     </Div>

        //                     <Div className="flex justify-between">
        //                         {isEditMode && (
        //                             <Button
        //                                 type="button"
        //                                 variant="primary"
        //                                 onClick={handleDelete}
        //                             >
        //                                 <Trash2 size={16} className="mr-2" /> Delete Project
        //                             </Button>
        //                         )}

        //                         <Button
        //                             onClick={handleSubmit}
        //                             type="submit"
        //                             variant="secondary"
        //                             disabled={isSubmitting}
        //                             className="ml-auto"
        //                         >
        //                             {isSubmitting ? "Saving..." : (
        //                                 <>
        //                                     {isEditMode ? "Update" : "Save"} Project <Save size={16} className="ml-2" />
        //                                 </>
        //                             )}
        //                         </Button>
        //                     </Div>
        //                 </form>
        //             </FormContainer>
        //         )}
        //     </Div>
        // </Div>
        <Div className="mb-8">
            <h3 className="text-18 font-semibold text-secondary-700 mb-4 pb-2 border-b border-neutral-200">
                Project Image
            </h3>
            <Div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
                {imageUrl && (
                    <Div className="mt-4">
                        <img src={imageUrl} alt="Project" className="w-32 h-32 object-cover rounded-md" />
                    </Div>
                )}
            </Div>
            <button onClick={handleSubmit}>
                Save
            </button>
            <Button
                onClick={handleSubmit}
                type="submit"
                variant="secondary"
                disabled={isSubmitting}
                className="ml-auto"
            >
                {isSubmitting ? "Saving..." : (
                    <>
                        {isEditMode ? "Update" : "Save"} Project <Save size={16} className="ml-2" />
                    </>
                )}
            </Button>
        </Div>
    );
};

export default AddEditProject;
