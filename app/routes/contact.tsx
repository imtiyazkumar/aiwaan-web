import { Div, Flex, FlexColumn } from "~/components/general/BaseComponents";
import Button from "~/components/buttons/Button";
import { wrapperBaseClass } from "~/utils/constants";
import TextInput from "~/components/general/TextInput";

export default function Contact() {
    return (
        <Flex className="min-h-[calc(100vh-4rem)] items-center justify-center px-4 bg-secondary-50">
            <Div className="w-full max-w-5xl">
                <Div className={`${wrapperBaseClass} px-6 sm:px-8 lg:px-12 py-10`}>
                    <FlexColumn className="text-center mb-10 gap-3">
                        <h1 className="text-3xl sm:text-4xl font-bold text-secondary-900">
                            Contact Us
                        </h1>
                        <p className="text-secondary-600 max-w-2xl mx-auto">
                            Have a project in mind or need more information?
                            Fill out the form below and we’ll get back to you shortly.
                        </p>
                    </FlexColumn>

                    <Flex className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                        <FlexColumn className="gap-6">
                            <TextInput label="Full Name" required />
                            <TextInput label="Email Address" type="email" required />
                            <TextInput label="Phone Number" type="tel" />
                            <Div>
                                <label className="block text-sm font-medium text-secondary-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    rows={5}
                                    className="w-full rounded-xl border border-secondary-200 px-4 py-3 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary-base/40 focus:border-primary-base resize-none"
                                    placeholder="Tell us about your project…"
                                />
                            </Div>

                            <Button
                                variant="primary_filled"
                                height="large"
                                className="w-fit mt-2"
                            >
                                Send Message
                            </Button>
                        </FlexColumn>

                        <FlexColumn className="gap-6 bg-secondary-100 rounded-2xl p-6 lg:p-8">
                            <Div>
                                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                                    Let’s Talk
                                </h3>
                                <p className="text-sm text-secondary-600">
                                    We’re happy to discuss your ideas, timelines, and requirements.
                                </p>
                            </Div>

                            <Div className="space-y-3 text-sm text-secondary-700">
                                <div>
                                    <span className="font-medium text-secondary-900">Location</span>
                                    <div>Sopore, Jammu & Kashmir, India</div>
                                </div>
                                <div>
                                    <span className="font-medium text-secondary-900">Email</span>
                                    <div>info@aiwaan.com</div>
                                </div>
                                <div>
                                    <span className="font-medium text-secondary-900">Phone</span>
                                    <div>+91 123 456 7890</div>
                                </div>
                            </Div>
                        </FlexColumn>
                    </Flex>
                </Div>
            </Div>
        </Flex>
    );
}
