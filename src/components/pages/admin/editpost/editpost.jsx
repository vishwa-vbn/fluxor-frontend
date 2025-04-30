// import React, { useState, useEffect } from "react";
// import { useHistory, useParams } from "react-router-dom";
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

// const EditPost = ({
//   tags = [],
//   categories = [],
//   onUpdatePost,
//   onFetchPost,
//   post,
//   loading,
//   error,
// }) => {
//   const navigate = useHistory();
//   const { slug } = useParams(); // Get slug from URL params
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

//   // Fetch post data when component mounts or slug changes
//   useEffect(() => {
//     console.log("slug", slug);
//     if (slug) {
//       onFetchPost(slug);
//     }
//   }, [slug]);

//   // Populate form data when post is fetched
//   useEffect(() => {
//     if (post?.data) {
//       setFormData({
//         title: post.data.title || "",
//         slug: post.data.slug || "",
//         excerpt: post.data.excerpt || "",
//         content: post.data.content || "",
//         metaTitle: post.data.metatitle || "", // Note: JSON has "metatitle"
//         metaDescription: post.data.metadescription || "", // Note: JSON has "metadescription"
//         status: post.data.status || "draft",
//         publishedAt: post.data.publishedat || "", // Note: JSON has "publishedat"
//         featuredImage: post.data.featuredimage || "", // Note: JSON has "featuredimage"
//         isCommentsEnabled: post.data.iscommentsenabled ?? false, // Match JSON field
//         selectedCategory: post.data.selectedCategory || "", // Match JSON field
//         selectedTags: post.data.selectedTags || [], // Already an array of IDs, no mapping needed
//       });
//     }
//   }, [post]);

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
//       tags: formData.selectedTags,
//     };
//     onUpdatePost(post.data.id, dataToSubmit); // Pass post ID and updated data
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
//             <div className="px-0 py-1 flex justify-between items-end">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => navigate.push("/posts")}
//               >
//                 <ArrowLeft className="h-4 w-4 mr-2" />
//                 Back to Posts
//               </Button>
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
//                  variant="outline"
//                   size="sm"
//                   onClick={() => handleSubmit("published")}
//                   disabled={loading}
//                 >
//                   {loading && status === "published" ? (
//                     <Loader2 className="animate-spin h-4 w-4 mr-2" />
//                   ) : null}
//                   Update & Publish
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
//                     <CardTitle>Edit Post Details</CardTitle>
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
//                      variant="outline"
//                       className="w-full"
//                       onClick={() => handleSubmit()}
//                       disabled={loading}
//                     >
//                       {loading ? (
//                         <Loader2 className="animate-spin h-4 w-4 mr-2" />
//                       ) : null}
//                       Update Post
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

// export default EditPost;

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
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
import DateTimePicker from "../../../controls/dateTimePicker/DateTimePicker"; // Import the DateTimePicker component

import { ArrowLeft, ImagePlus, Loader2 } from "lucide-react";

const EditPost = ({
  tags = [],
  categories = [],
  onUpdatePost,
  onFetchPost,
  post,
  loading,
  error,
}) => {
  const navigate = useHistory();
  const { slug } = useParams(); // Get slug from URL params
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

  // Fetch post data when component mounts or slug changes
  useEffect(() => {
    if (slug) {
      onFetchPost(slug);
    }
  }, [slug, onFetchPost]);

  // Populate form data when post is fetched
  useEffect(() => {
    if (post?.data) {
      setFormData({
        title: post.data.title || "",
        slug: post.data.slug || "",
        excerpt: post.data.excerpt || "",
        content: post.data.content || "",
        metaTitle: post.data.metatitle || "",
        metaDescription: post.data.metadescription || "",
        status: post.data.status || "draft",
        publishedAt: post.data.publishedat || "",
        featuredImage: post.data.featuredimage || "",
        isCommentsEnabled: post.data.iscommentsenabled ?? false,
        selectedCategory: post.data.selectedCategory || "",
        selectedTags: post.data.selectedTags || [],
      });
    }
  }, [post]);

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

  // const handleSubmit = (status = formData.status) => {
  //   // Prepare data to submit
  //   const updatedFormData = {
  //     ...formData,
  //     status,
  //     categoryId: formData.selectedCategory,
  //     tags: formData.selectedTags,
  //   };

  //   // If status is "published" and publishedAt is empty, set to current date
  //   if (status === "published" && !updatedFormData.publishedAt) {
  //     updatedFormData.publishedAt = moment().format("YYYY-MM-DD HH:mm:ss");
  //   }

  //   onUpdatePost(post.data.id, updatedFormData); // Pass post ID and updated data
  // };

  const handleSubmit = (status = formData.status) => {
    // Validate scheduled posts
    if (status === "scheduled" && !formData.publishedAt) {
      alert("Please select a publish date for scheduling.");
      return;
    }

    // Ensure publishedAt is formatted correctly
    const updatedFormData = {
      ...formData,
      status,
      categoryId: formData.selectedCategory,
      tags: formData.selectedTags,
      publishedAt:
        status === "scheduled"
          ? moment(formData.publishedAt).format("YYYY-MM-DD HH:mm:ss")
          : status === "published" && !formData.publishedAt
          ? moment().format("YYYY-MM-DD HH:mm:ss")
          : formData.publishedAt || null,
    };

    onUpdatePost(post.data.id, updatedFormData);
  };

  const sampleUserData = {
    name: "John Doe",
    email: "john@example.com",
  };

  const handleSearch = (query) => {
    // Implement search logic if needed
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="flex-1 flex flex-col">
        <TopNavbar
          userData={sampleUserData}
          onSearch={handleSearch}
          notificationCount={3}
          toggleSidebar={() => setSidebarOpen?.((prev) => !prev)}
        />

        <main className="flex-1 max-w-[100%] w-full mx-auto px-6 py-8 space-y-1">
          <div className="border-0 mb-0 border-gray-200 dark:border-gray-600">
            <div className="px-0 py-2 flex justify-between items-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate.push("/posts")}
              >
                <ArrowLeft className="h-4.5 w-4.5 mr-1 text-gray-600 dark:text-gray-400" />
                Back
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSubmit("draft")}
                  disabled={loading}
                >
                  {loading && formData.status === "draft" ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                  ) : null}
                  Save as Draft
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleSubmit(
                      formData.status === "scheduled"
                        ? "scheduled"
                        : "published"
                    )
                  }
                  disabled={loading}
                >
                  {loading &&
                  (formData.status === "published" ||
                    formData.status === "scheduled") ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                  ) : null}
                  {formData.status === "scheduled"
                    ? "Schedule Post"
                    : "Update & Publish"}
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
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">
                      Edit Post Details
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
                    />

                    <div className="w-full flex-col sm:flex-col items-center gap-2 mb-2">
                      <Input
                        label="Slug"
                        value={formData.slug}
                        placeholder="Auto-generated slug"
                        onChange={(e) => handleChange("slug", e.target.value)}
                        disabled={loading}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={generateSlug}
                        disabled={isGeneratingSlug || loading}
                      >
                        {isGeneratingSlug ? (
                          <Loader2 className="animate-spin h-4 w-4 text-gray-600 dark:text-gray-400" />
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
                      className="h-20 resize-none"
                      disabled={loading}
                    />
                  </CardContent>
                </Card>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-gray-100 dark:bg-gray-700">
                    <TabsTrigger
                      value="content"
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100"
                    >
                      Content
                    </TabsTrigger>
                    <TabsTrigger
                      value="seo"
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100"
                    >
                      SEO
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" activeTab={activeTab}>
                    <Card>
                      <CardContent>
                        <RichTextEditor
                          value={formData.content}
                          onChange={(val) => handleChange("content", val)}
                          disabled={loading}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="seo" activeTab={activeTab}>
                    <Card>
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
                        />




                        <Textarea
                          label="Meta Description"
                          value={formData.metaDescription}
                            onChange={(e) => handleChange("metaDescription", e.target.value)}
                          placeholder="SEO description"
                          className="h-20 resize-none"
                          disabled={loading}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <Card>
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
                    />

                    {formData.status === "scheduled" && (
                      <DateTimePicker
                        label={`${formData.status === "scheduled"?"Scheduled Date":"Published Date"}`}
                        value={formData.publishedAt}
                        onChange={(value) => handleChange("publishedAt", value)}
                        name="publishedAt"
                        disabled={loading}
                      />
                    )}
                  </CardContent>
                </Card>

                <Card>
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
                          className="absolute top-2 right-2"
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
                    />
                  </CardContent>
                </Card>

                <Card>
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
                    />
                  </CardContent>
                </Card>

                <Card>
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
                    />
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleSubmit()}
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="animate-spin h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                      ) : null}
                      Update Post
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

export default EditPost;
