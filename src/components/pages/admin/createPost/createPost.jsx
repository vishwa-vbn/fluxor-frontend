// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import moment from "moment";

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "../../../common/card/Card";
// import {
//   Tabs,
//   TabsList,
//   TabsTrigger,
//   TabsContent,
// } from "../../../common/tabs/Tabs";

// import Input from "../../../controls/input/inputView";
// import Textarea from "../../../controls/textarea/Textarea";
// import RichTextEditor from "../../../controls/richTextEditor/richTextEditor";
// import Checkbox from "../../../controls/checkbox/Checkbox";
// import Button from "../../../controls/button/buttonView";
// import Select from "../../../controls/selection/selection";
// import TopNavbar from "../../../common/topNavbar/topNavbar";

// import { ArrowLeft, ImagePlus, Loader2 } from "lucide-react";

// const CreatePost = ({ tags = [], categories = [], onCreatePost }) => {
//   const navigate = useHistory();
//   const [activeTab, setActiveTab] = useState("content");
//   const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     slug: "",
//     excerpt: "",
//     content: "",
//     metaTitle: "",
//     metaDescription: "",
//     status: "draft",
//     publishedAt: "",
//     featuredImage: "",
//     isCommentsEnabled: true,
//     selectedCategory: "",
//     selectedTags: [],
//   });

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const generateSlug = () => {
//     if (!formData.title) return;
//     setIsGeneratingSlug(true);
//     setTimeout(() => {
//       const slug = formData.title
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, "-")
//         .replace(/(^-|-$)+/g, "");
//       setFormData((prev) => ({ ...prev, slug }));
//       setIsGeneratingSlug(false);
//     }, 500);
//   };

//   const handleSubmit = (status = formData.status) => {
//     const dataToSubmit = {
//       ...formData,
//       status,
//       categoryId: formData.selectedCategory,
//       tagIds: formData.selectedTags,
//     };
//     console.log("Submitted:", dataToSubmit);
//     setTimeout(() => {
//       alert("Post created!");
//       onCreatePost?.(dataToSubmit);
//     }, 1000);
//   };

//   const sampleUserData = {
//     name: "John Doe",
//     email: "john@example.com",
//   };

//   const handleSearch = (query) => {
//     console.log("Searching for:", query);
//   };

//   return (
//     <div className="flex min-h-screen bg-white text-black">
//       <div className="flex-1 flex flex-col">
//         <TopNavbar
//           userData={sampleUserData}
//           onSearch={handleSearch}
//           notificationCount={3}
//           toggleSidebar={() => setSidebarOpen?.((prev) => !prev)}
//         />

//         <div className="flex-1 max-w-[100%] w-full mx-auto py-5 space-y-8">
//           <div className="border-0 mb-0 border-gray-200">
//             <div className="px-6 py-1 flex justify-end items-end">
//               <div className="flex gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleSubmit("draft")}
//                 >
//                   Save as Draft
//                 </Button>
//                 <Button
//                   variant="primary"
//                   size="sm"
//                   onClick={() => handleSubmit("published")}
//                 >
//                   Publish
//                 </Button>
//               </div>
//             </div>
//           </div>

//           <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Left Column */}
//               <div className="lg:col-span-2 space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Post Details</CardTitle>
//                   </CardHeader>
//                   <CardContent className="flex flex-col space-y-4">
//                     <Input
//                       label="Title"
//                       value={formData.title}
//                       placeholder="Enter title"
//                       onChange={(e) => {
//                         handleChange("title", e.target.value);
//                         if (!formData.slug) generateSlug();
//                       }}
//                     />

//                     <div className="flex-1 flex-col sm:flex-row items-center gap-2 mb-2">
//                       <Input
//                         label="Slug"
//                         value={formData.slug}
//                         placeholder="Auto-generated slug"
//                         onChange={(e) => handleChange("slug", e.target.value)}
//                       />
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={generateSlug}
//                         disabled={isGeneratingSlug}
//                       >
//                         {isGeneratingSlug ? (
//                           <Loader2 className="animate-spin h-4 w-4" />
//                         ) : (
//                           "Generate"
//                         )}
//                       </Button>
//                     </div>

//                     <Textarea
//                       label="Excerpt"
//                       value={formData.excerpt}
//                       onChange={(e) => handleChange("excerpt", e.target.value)}
//                       placeholder="Short post description"
//                       className="h-20 resize-none"
//                     />
//                   </CardContent>
//                 </Card>

//                 <Tabs>
//                   <TabsList>
//                     <TabsTrigger
//                       value="content"
//                       activeTab={activeTab}
//                       setActiveTab={setActiveTab}
//                     >
//                       Content
//                     </TabsTrigger>
//                     <TabsTrigger
//                       value="seo"
//                       activeTab={activeTab}
//                       setActiveTab={setActiveTab}
//                     >
//                       SEO
//                     </TabsTrigger>
//                   </TabsList>

//                   <TabsContent value="content" activeTab={activeTab}>
//                     <Card>
//                       <CardContent>
//                         <RichTextEditor
//                           value={formData.content}
//                           onChange={(val) => handleChange("content", val)}
//                         />
//                       </CardContent>
//                     </Card>
//                   </TabsContent>

//                   <TabsContent value="seo" activeTab={activeTab}>
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>SEO Settings</CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         <Input
//                           label="Meta Title"
//                           value={formData.metaTitle}
//                           onChange={(e) =>
//                             handleChange("metaTitle", e.target.value)
//                           }
//                           placeholder="SEO title"
//                         />
//                         <Textarea
//                           label="Meta Description"
//                           value={formData.metaDescription}
//                           onChange={(e) =>
//                             handleChange("metaDescription", e.target.value)
//                           }
//                           placeholder="SEO description"
//                           className="h-20 resize-none"
//                         />
//                       </CardContent>
//                     </Card>
//                   </TabsContent>
//                 </Tabs>
//               </div>

//               {/* Right Column */}
//               <div className="space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Publish Settings</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <Select
//                       label="Status"
//                       value={formData.status}
//                       onChange={(val) => handleChange("status", val)} // ✅ use val directly
//                       options={[
//                         { label: "Draft", value: "draft" },
//                         { label: "Published", value: "published" },
//                         { label: "Scheduled", value: "scheduled" },
//                       ]}
//                     />

//                     {formData.status === "scheduled" && (
//                       <Input
//                         label="Publish Date"
//                         type="datetime-local"
//                         value={
//                           formData.publishedAt
//                             ? moment(formData.publishedAt).format(
//                                 "YYYY-MM-DDTHH:mm"
//                               )
//                             : ""
//                         }
//                         onChange={(e) =>
//                           handleChange(
//                             "publishedAt",
//                             moment(e.target.value).format("YYYY-MM-DD HH:mm:ss")
//                           )
//                         }
//                       />
//                     )}
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Featured Image</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-2">
//                     {formData.featuredImage ? (
//                       <figure className="relative">
//                         <img
//                           src={formData.featuredImage}
//                           alt="Featured"
//                           className="w-full h-40 object-cover rounded-md border border-gray-200"
//                         />
//                         <Button
//                           type="button"
//                           variant="error"
//                           size="xs"
//                           className="absolute top-2 right-2"
//                           onClick={() => handleChange("featuredImage", "")}
//                         >
//                           Remove
//                         </Button>
//                       </figure>
//                     ) : (
//                       <div className="text-center border border-dashed border-gray-300 p-4 rounded-md">
//                         <ImagePlus className="w-6 h-6 mx-auto text-black/40 mb-2" />
//                         <p className="text-sm text-black/50">
//                           No image selected
//                         </p>
//                       </div>
//                     )}

//                     <Input
//                       label="Image URL"
//                       value={formData.featuredImage}
//                       onChange={(e) =>
//                         handleChange("featuredImage", e.target.value)
//                       }
//                       placeholder="https://example.com/image.jpg"
//                     />
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Categories & Tags</CardTitle>
//                   </CardHeader>
//                   <CardContent className=" flex flex-col gap-1.5">
//                     <Select
//                       label="Category"
//                       value={formData.selectedCategory}
//                       onChange={(val) => handleChange("selectedCategory", val)} // ✅ use val directly
//                       options={categories.map((c) => ({
//                         label: c.name,
//                         value: c.id,
//                       }))}
//                     />

//                     <Select
//                       label="Tags"
//                       multiple={true}
//                       value={formData.selectedTags}
//                       onChange={(values) =>
//                         handleChange("selectedTags", values)
//                       }
//                       options={tags.map((t) => ({
//                         label: t.name,
//                         value: t.id,
//                       }))}
//                     />
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Settings</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <Checkbox
//                       label="Enable Comments"
//                       checked={formData.isCommentsEnabled}
//                       onChange={(e) =>
//                         handleChange("isCommentsEnabled", e.target.checked)
//                       }
//                     />
//                   </CardContent>
//                   <CardFooter>
//                     <Button
//                       variant="primary"
//                       className="w-full"
//                       onClick={() => handleSubmit()}
//                     >
//                       Save Post
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;

// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import moment from "moment";

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "../../../common/card/Card";
// import {
//   Tabs,
//   TabsList,
//   TabsTrigger,
//   TabsContent,
// } from "../../../common/tabs/Tabs";

// import Input from "../../../controls/input/inputView";
// import Textarea from "../../../controls/textarea/Textarea";
// import RichTextEditor from "../../../controls/richTextEditor/richTextEditor";
// import Checkbox from "../../../controls/checkbox/Checkbox";
// import Button from "../../../controls/button/buttonView";
// import Select from "../../../controls/selection/selection";
// import TopNavbar from "../../../common/topNavbar/topNavbar";

// import { ArrowLeft, ImagePlus, Loader2 } from "lucide-react";

// const CreatePost = ({
//   tags = [],
//   categories = [],
//   onCreatePost,
//   loading,
//   error,
// }) => {
//   const navigate = useHistory();
//   const [activeTab, setActiveTab] = useState("content");
//   const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     slug: "",
//     excerpt: "",
//     content: "",
//     metaTitle: "",
//     metaDescription: "",
//     status: "draft",
//     publishedAt: "",
//     featuredImage: "",
//     isCommentsEnabled: true,
//     selectedCategory: "",
//     selectedTags: [],
//   });

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const generateSlug = () => {
//     if (!formData.title) return;
//     setIsGeneratingSlug(true);
//     setTimeout(() => {
//       const slug = formData.title
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, "-")
//         .replace(/(^-|-$)+/g, "");
//       setFormData((prev) => ({ ...prev, slug }));
//       setIsGeneratingSlug(false);
//     }, 500);
//   };

//   const handleSubmit = (status = formData.status) => {
//     const dataToSubmit = {
//       ...formData,
//       status,
//       categoryId: formData.selectedCategory, // Matches API expectation
//       tags: formData.selectedTags, // Matches API expectation (assuming tags is an array of IDs)
//     };
//     onCreatePost(dataToSubmit);
//   };

//   const sampleUserData = {
//     name: "John Doe",
//     email: "john@example.com",
//   };

//   const handleSearch = (query) => {
//     console.log("Searching for:", query);
//   };

//   return (
//     <div className="flex min-h-screen bg-white text-black">
//       <div className="flex-1 flex flex-col">
//         <TopNavbar
//           userData={sampleUserData}
//           onSearch={handleSearch}
//           notificationCount={3}
//           toggleSidebar={() => setSidebarOpen?.((prev) => !prev)}
//         />

// <main className="flex-1 max-w-[100%] w-full mx-auto px-6 py-8 space-y-8">
//           <div className="border-0 mb-0 border-gray-200">
//             <div className="px-0 py-1 flex justify-end items-end">
//               <div className="flex gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleSubmit("draft")}
//                   disabled={loading}
//                 >
//                   {loading && status === "draft" ? (
//                     <Loader2 className="animate-spin h-4 w-4 mr-2" />
//                   ) : null}
//                   Save as Draft
//                 </Button>
//                 <Button
//                   variant="primary"
//                   size="sm"
//                   onClick={() => handleSubmit("published")}
//                   disabled={loading}
//                 >
//                   {loading && status === "published" ? (
//                     <Loader2 className="animate-spin h-4 w-4 mr-2" />
//                   ) : null}
//                   Publish
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {error && <div className="text-red-500 text-center">{error}</div>}

//           <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Left Column */}
//               <div className="lg:col-span-2 space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Post Details</CardTitle>
//                   </CardHeader>
//                   <CardContent className="flex flex-col space-y-4">
//                     <Input
//                       label="Title"
//                       value={formData.title}
//                       placeholder="Enter title"
//                       onChange={(e) => {
//                         handleChange("title", e.target.value);
//                         if (!formData.slug) generateSlug();
//                       }}
//                       disabled={loading}
//                     />

//                     <div className="flex-1 flex-col sm:flex-row items-center gap-2 mb-2">
//                       <Input
//                         label="Slug"
//                         value={formData.slug}
//                         placeholder="Auto-generated slug"
//                         onChange={(e) => handleChange("slug", e.target.value)}
//                         disabled={loading}
//                       />
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={generateSlug}
//                         disabled={isGeneratingSlug || loading}
//                       >
//                         {isGeneratingSlug ? (
//                           <Loader2 className="animate-spin h-4 w-4" />
//                         ) : (
//                           "Generate"
//                         )}
//                       </Button>
//                     </div>

//                     <Textarea
//                       label="Excerpt"
//                       value={formData.excerpt}
//                       onChange={(e) => handleChange("excerpt", e.target.value)}
//                       placeholder="Short post description"
//                       className="h-20 resize-none"
//                       disabled={loading}
//                     />
//                   </CardContent>
//                 </Card>

//                 <Tabs>
//                   <TabsList>
//                     <TabsTrigger
//                       value="content"
//                       activeTab={activeTab}
//                       setActiveTab={setActiveTab}
//                     >
//                       Content
//                     </TabsTrigger>
//                     <TabsTrigger
//                       value="seo"
//                       activeTab={activeTab}
//                       setActiveTab={setActiveTab}
//                     >
//                       SEO
//                     </TabsTrigger>
//                   </TabsList>

//                   <TabsContent value="content" activeTab={activeTab}>
//                     <Card>
//                       <CardContent>
//                         <RichTextEditor
//                           value={formData.content}
//                           onChange={(val) => handleChange("content", val)}
//                           disabled={loading}
//                         />
//                       </CardContent>
//                     </Card>
//                   </TabsContent>

//                   <TabsContent value="seo" activeTab={activeTab}>
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>SEO Settings</CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         <Input
//                           label="Meta Title"
//                           value={formData.metaTitle}
//                           onChange={(e) =>
//                             handleChange("metaTitle", e.target.value)
//                           }
//                           placeholder="SEO title"
//                           disabled={loading}
//                         />
//                         <Textarea
//                           label="Meta Description"
//                           value={formData.metaDescription}
//                           onChange={(e) =>
//                             handleChange("metaDescription", e.target.value)
//                           }
//                           placeholder="SEO description"
//                           className="h-20 resize-none"
//                           disabled={loading}
//                         />
//                       </CardContent>
//                     </Card>
//                   </TabsContent>
//                 </Tabs>
//               </div>

//               {/* Right Column */}
//               <div className="space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Publish Settings</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <Select
//                       label="Status"
//                       value={formData.status}
//                       onChange={(val) => handleChange("status", val)}
//                       options={[
//                         { label: "Draft", value: "draft" },
//                         { label: "Published", value: "published" },
//                         { label: "Scheduled", value: "scheduled" },
//                       ]}
//                       disabled={loading}
//                     />

//                     {formData.status === "scheduled" && (
//                       <Input
//                         label="Publish Date"
//                         type="datetime-local"
//                         value={
//                           formData.publishedAt
//                             ? moment(formData.publishedAt).format(
//                                 "YYYY-MM-DDTHH:mm"
//                               )
//                             : ""
//                         }
//                         onChange={(e) =>
//                           handleChange(
//                             "publishedAt",
//                             moment(e.target.value).format("YYYY-MM-DD HH:mm:ss")
//                           )
//                         }
//                         disabled={loading}
//                       />
//                     )}
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Featured Image</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-2">
//                     {formData.featuredImage ? (
//                       <figure className="relative">
//                         <img
//                           src={formData.featuredImage}
//                           alt="Featured"
//                           className="w-full h-40 object-cover rounded-md border border-gray-200"
//                         />
//                         <Button
//                           type="button"
//                           variant="error"
//                           size="xs"
//                           className="absolute top-2 right-2"
//                           onClick={() => handleChange("featuredImage", "")}
//                           disabled={loading}
//                         >
//                           Remove
//                         </Button>
//                       </figure>
//                     ) : (
//                       <div className="text-center border border-dashed border-gray-300 p-4 rounded-md">
//                         <ImagePlus className="w-6 h-6 mx-auto text-black/40 mb-2" />
//                         <p className="text-sm text-black/50">
//                           No image selected
//                         </p>
//                       </div>
//                     )}

//                     <Input
//                       label="Image URL"
//                       value={formData.featuredImage}
//                       onChange={(e) =>
//                         handleChange("featuredImage", e.target.value)
//                       }
//                       placeholder="https://example.com/image.jpg"
//                       disabled={loading}
//                     />
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Categories & Tags</CardTitle>
//                   </CardHeader>
//                   <CardContent className="flex flex-col gap-1.5">
//                     <Select
//                       label="Category"
//                       value={formData.selectedCategory}
//                       onChange={(val) => handleChange("selectedCategory", val)}
//                       options={categories.map((c) => ({
//                         label: c.name,
//                         value: c.id,
//                       }))}
//                       disabled={loading}
//                     />

//                     <Select
//                       label="Tags"
//                       multiple={true}
//                       value={formData.selectedTags}
//                       onChange={(values) =>
//                         handleChange("selectedTags", values)
//                       }
//                       options={tags.map((t) => ({
//                         label: t.name,
//                         value: t.id,
//                       }))}
//                       disabled={loading}
//                     />
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Settings</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <Checkbox
//                       label="Enable Comments"
//                       checked={formData.isCommentsEnabled}
//                       onChange={(e) =>
//                         handleChange("isCommentsEnabled", e.target.checked)
//                       }
//                       disabled={loading}
//                     />
//                   </CardContent>
//                   <CardFooter>
//                     <Button
//                       variant="primary"
//                       className="w-full"
//                       onClick={() => handleSubmit()}
//                       disabled={loading}
//                     >
//                       {loading ? (
//                         <Loader2 className="animate-spin h-4 w-4 mr-2" />
//                       ) : null}
//                       Save Post
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               </div>
//             </div>
//           </form>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;




import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../../common/card/Card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../common/tabs/Tabs";

import Input from "../../../controls/input/inputView";
import Textarea from "../../../controls/textarea/Textarea";
import RichTextEditor from "../../../controls/richTextEditor/richTextEditor";
import Checkbox from "../../../controls/checkbox/Checkbox";
import Button from "../../../controls/button/buttonView";
import Select from "../../../controls/selection/selection";
import TopNavbar from "../../../common/topNavbar/topNavbar";

import { ArrowLeft, ImagePlus, Loader2 } from "lucide-react";

const CreatePost = ({
  tags = [],
  categories = [],
  onCreatePost,
  loading,
  error,
}) => {
  const navigate = useHistory();
  const [activeTab, setActiveTab] = useState("content");
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    status: "draft",
    publishedAt: "",
    featuredImage: "",
    isCommentsEnabled: true,
    selectedCategory: "",
    selectedTags: [],
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateSlug = () => {
    if (!formData.title) return;
    setIsGeneratingSlug(true);
    setTimeout(() => {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData((prev) => ({ ...prev, slug }));
      setIsGeneratingSlug(false);
    }, 500);
  };

  const handleSubmit = (status = formData.status) => {
    const dataToSubmit = {
      ...formData,
      status,
      categoryId: formData.selectedCategory,
      tags: formData.selectedTags,
    };
    onCreatePost(dataToSubmit);
  };

  const sampleUserData = {
    name: "John Doe",
    email: "john@example.com",
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex-1 flex flex-col">
        <TopNavbar
          userData={sampleUserData}
          onSearch={handleSearch}
          notificationCount={3}
          toggleSidebar={() => setSidebarOpen?.((prev) => !prev)}
          className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
        />

        <main className="flex-1 max-w-[100%] w-full mx-auto px-6 py-8 space-y-8">
          <div className="border-0 mb-0 border-gray-200 dark:border-gray-700">
            <div className="px-0 py-1 flex justify-end items-end">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSubmit("draft")}
                  disabled={loading}
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {loading && status === "draft" ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2 text-gray-700 dark:text-gray-200" />
                  ) : null}
                  Save as Draft
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleSubmit("published")}
                  disabled={loading}
                  className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white"
                >
                  {loading && status === "published" ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2 text-white" />
                  ) : null}
                  Publish
                </Button>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 dark:text-red-400 text-center">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">
                      Post Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col space-y-4">
                    <Input
                      label="Title"
                      value={formData.title}
                      placeholder="Enter title"
                      onChange={(e) => {
                        handleChange("title", e.target.value);
                        if (!formData.slug) generateSlug();
                      }}
                      disabled={loading}
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                    />

                    <div className="flex-1 flex-col sm:flex-row items-center gap-2 mb-2">
                      <Input
                        label="Slug"
                        value={formData.slug}
                        placeholder="Auto-generated slug"
                        onChange={(e) => handleChange("slug", e.target.value)}
                        disabled={loading}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={generateSlug}
                        disabled={isGeneratingSlug || loading}
                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {isGeneratingSlug ? (
                          <Loader2 className="animate-spin h-4 w-4 text-gray-700 dark:text-gray-200" />
                        ) : (
                          "Generate"
                        )}
                      </Button>
                    </div>

                    <Textarea
                      label="Excerpt"
                      value={formData.excerpt}
                      onChange={(e) => handleChange("excerpt", e.target.value)}
                      placeholder="Short post description"
                      className="h-20 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                      disabled={loading}
                    />
                  </CardContent>
                </Card>

                <Tabs 
                value={activeTab} onValueChange={setActiveTab}
                defaultValue="content"
                 >
                  <TabsList className="bg-gray-100 dark:bg-gray-800">
                    <TabsTrigger
                      value="content"
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      className="text-gray-700 dark:text-gray-200 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:shadow-sm"
                    >
                      Content
                    </TabsTrigger>
                    <TabsTrigger
                      value="seo"
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      className="text-gray-700 dark:text-gray-200 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:shadow-sm"
                    >
                      SEO
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" activeTab={activeTab}>
                    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <CardContent>
                        <RichTextEditor
                          value={formData.content}
                          onChange={(val) => handleChange("content", val)}
                          disabled={loading}
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="seo" activeTab={activeTab}>
                    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-gray-100">
                          SEO Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Input
                          label="Meta Title"
                          value={formData.metaTitle}
                          onChange={(e) =>
                            handleChange("metaTitle", e.target.value)
                          }
                          placeholder="SEO title"
                          disabled={loading}
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                        />
                        <Textarea
                          label="Meta Description"
                          value={formData.metaDescription}
                          onChange={(e) =>
                            handleChange("metaDescription", e.target.value)
                          }
                          placeholder="SEO description"
                          className="h-20 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                          disabled={loading}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">
                      Publish Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Select
                      label="Status"
                      value={formData.status}
                      onChange={(val) => handleChange("status", val)}
                      options={[
                        { label: "Draft", value: "draft" },
                        { label: "Published", value: "published" },
                        { label: "Scheduled", value: "scheduled" },
                      ]}
                      disabled={loading}
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                    />

                    {formData.status === "scheduled" && (
                      <Input
                        label="Publish Date"
                        type="datetime-local"
                        value={
                          formData.publishedAt
                            ? moment(formData.publishedAt).format(
                                "YYYY-MM-DDTHH:mm"
                              )
                            : ""
                        }
                        onChange={(e) =>
                          handleChange(
                            "publishedAt",
                            moment(e.target.value).format("YYYY-MM-DD HH:mm:ss")
                          )
                        }
                        disabled={loading}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                      />
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">
                      Featured Image
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {formData.featuredImage ? (
                      <figure className="relative">
                        <img
                          src={formData.featuredImage}
                          alt="Featured"
                          className="w-full h-40 object-cover rounded-md border border-gray-200 dark:border-gray-600"
                        />
                        <Button
                          type="button"
                          variant="error"
                          size="xs"
                          className="absolute top-2 right-2 bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-white"
                          onClick={() => handleChange("featuredImage", "")}
                          disabled={loading}
                        >
                          Remove
                        </Button>
                      </figure>
                    ) : (
                      <div className="text-center border border-dashed border-gray-300 dark:border-gray-600 p-4 rounded-md">
                        <ImagePlus className="w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          No image selected
                        </p>
                      </div>
                    )}

                    <Input
                      label="Image URL"
                      value={formData.featuredImage}
                      onChange={(e) =>
                        handleChange("featuredImage", e.target.value)
                      }
                      placeholder="https://example.com/image.jpg"
                      disabled={loading}
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                    />
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">
                      Categories & Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-1.5">
                    <Select
                      label="Category"
                      value={formData.selectedCategory}
                      onChange={(val) => handleChange("selectedCategory", val)}
                      options={categories.map((c) => ({
                        label: c.name,
                        value: c.id,
                      }))}
                      disabled={loading}
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                    />

                    <Select
                      label="Tags"
                      multiple={true}
                      value={formData.selectedTags}
                      onChange={(values) =>
                        handleChange("selectedTags", values)
                      }
                      options={tags.map((t) => ({
                        label: t.name,
                        value: t.id,
                      }))}
                      disabled={loading}
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                    />
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">
                      Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Checkbox
                      label="Enable Comments"
                      checked={formData.isCommentsEnabled}
                      onChange={(e) =>
                        handleChange("isCommentsEnabled", e.target.checked)
                      }
                      disabled={loading}
                      className="text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="primary"
                      className="w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white"
                      onClick={() => handleSubmit()}
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="animate-spin h-4 w-4 mr-2 text-white" />
                      ) : null}
                      Save Post
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default CreatePost;