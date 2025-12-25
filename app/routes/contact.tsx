import { Div, Flex, FlexColumn } from "~/components/general/BaseComponents";
import Button from "~/components/buttons/Button";
import { wrapperBaseClass } from "~/utils/constants";
import TextInput from "~/components/general/TextInput";
import Title from "~/components/general/Title";

export default function Contact() {
    return (
        <FlexColumn className={`${wrapperBaseClass} max-w-6xl px-2 sm:px-10 py-12`}>
            <FlexColumn className="text-center gap-1 w-full mb-2 lg:mb-6">
                <Div className="text-center px-6">
                    <Title title={"Contact"} subtitle={"US"} />
                </Div>
                <p className="text-secondary-600 max-w-2xl mx-auto">
                    Have a project in mind or need guidance?
                    Let’s talk and turn your ideas into reality.
                </p>
            </FlexColumn>
            <Flex className=" gap-10 items-start w-full flex-col-reverse md:flex-row">
                <FlexColumn className=" w-full gap-6 bg-secondary-100 rounded-2xl p-6 lg:p-8 md:max-w-1/2  min-w-1/2">
                    <Div className="w-full">
                        <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                            Get in Touch
                        </h3>
                        <p className="text-sm text-secondary-600">
                            We’d love to hear about your project, timeline, and goals.
                        </p>
                    </Div>

                    <Div className="space-y-3 text-sm text-secondary-700 min-w-1/2">
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

                <FlexColumn className="gap-6 md:max-w-1/2 w-full">
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
                        className="w-fit ml-auto"
                    >
                        Send Message
                    </Button>
                </FlexColumn>
            </Flex>
        </FlexColumn>
    );
}
