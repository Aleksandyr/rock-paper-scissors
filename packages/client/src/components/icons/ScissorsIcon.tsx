import React from 'react'
import { SvgIcon, SvgIconProps } from "@mui/material"

const ScissorsIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon viewBox='0 0 80 90' {...props}>
            <path id="Vector" d="M53.5475 98.3909C59.3811 96.8027 62.4189 92.8094 62.6574 86.408C62.6663 86.2059 62.6503 86.0091 62.6104 85.819C63.5899 85.27 64.5321 84.6199 65.4415 83.8673C68.8625 81.0564 70.5635 77.7525 70.5404 73.9537C70.5501 73.5691 70.4729 72.9567 70.3097 72.1218C70.2289 71.6987 70.1828 71.4295 70.1695 71.3118V71.0954C71.6565 70.4182 73.146 69.4649 74.6437 68.2378L74.6659 68.219C78.2884 65.2648 80.0647 62.0528 79.9982 58.5807C79.9822 55.5497 78.9877 52.8958 77.0074 50.6197C74.7423 48.0013 72.1073 46.7395 69.1012 46.8346H68.9389C68.8084 43.5193 67.766 40.4982 65.8097 37.768L65.784 37.7477C63.0921 34.0991 59.8078 32.3312 55.9305 32.4466C54.5925 32.4247 53.3035 32.6088 52.0568 32.9994C52.7719 29.758 53.3885 26.4471 53.912 23.0655C54.9899 16.0788 55.2987 11.3344 54.8391 8.83591C54.8302 8.82233 54.8222 8.80951 54.8151 8.79594C54.2242 5.55453 52.0985 3.06416 48.4396 1.32598L48.4618 1.34634C44.858 -0.487045 40.7864 -0.448586 36.243 1.4655C31.7731 3.01154 29.1683 8.01781 28.4309 16.4832C28.4211 16.582 28.414 16.6816 28.4069 16.7789C26.2598 10.8639 23.5609 7.26353 20.3163 5.97906L20.2924 5.95869C15.7712 3.8923 12.1307 3.611 9.37339 5.11027C6.70372 6.33202 4.86625 8.16381 3.85484 10.6088V10.5704C2.9419 12.6518 2.54085 15.0223 2.6491 17.6858V17.7258C2.67483 20.1436 4.15118 24.9793 7.07539 32.2292C9.36167 37.9065 11.5878 42.6172 13.7543 46.3615C11.7829 47.2952 9.77596 48.5969 7.72657 50.2636C2.5185 54.5028 -0.0516865 59.1673 0.00418724 64.2565C-0.107603 67.8555 2.01907 71.9476 6.3806 76.5352C8.86222 79.2525 12.6862 81.5233 17.8558 83.3559C17.1789 84.4608 16.8692 85.571 16.9287 86.6848C16.745 90.7535 19.5797 94.0258 25.4381 96.4995C29.4562 98.1813 33.8782 99.2793 38.7013 99.7915C43.6361 100.316 48.5823 99.8503 53.5471 98.391L53.5475 98.3909ZM65.8567 58.5226V58.5007C66.9915 56.659 67.8166 54.7276 68.3402 52.7079C68.6054 52.5971 68.8627 52.4545 69.1049 52.2743C70.1155 52.3678 71.0338 52.8942 71.865 53.8512C73.0371 55.2027 73.6146 56.7774 73.6031 58.5822C73.5365 60.6208 72.416 62.5257 70.2395 64.2979L70.2182 64.3168C68.2211 65.9541 66.2737 66.8153 64.3733 66.8998C63.2341 66.8998 62.2688 66.6585 61.4747 66.1705L61.4525 66.1517C60.9805 65.8191 60.7347 65.4126 60.7117 64.9284C60.7099 64.7029 60.7099 64.5521 60.7117 64.4752C60.717 64.451 60.7259 64.4329 60.7356 64.4141V64.4933C60.914 64.1856 61.0222 63.8756 61.0595 63.5671C62.8738 62.4291 64.4716 60.7474 65.8567 58.5225L65.8567 58.5226ZM28.276 91.6124C25.1609 90.3008 23.5151 88.6582 23.335 86.6847C23.4113 86.2043 23.6739 85.7103 24.1238 85.2073C25.7491 85.6062 27.466 85.975 29.2723 86.3122C30.1311 86.4698 30.9359 86.3446 31.6828 85.9358C32.4317 85.5324 32.9037 84.9667 33.0971 84.242C33.2834 83.5104 33.137 82.8241 32.6579 82.1914C32.1833 81.5556 31.5178 81.1544 30.6625 80.9878C21.2855 79.2426 14.8487 76.6136 11.3504 73.106C8.16791 69.7553 6.52123 66.8064 6.40948 64.2558C6.47425 60.6223 8.39066 57.2714 12.1595 54.2043H12.1355C14.5283 52.2594 16.8405 50.9523 19.0675 50.2833C19.0915 50.2758 19.1145 50.269 19.1367 50.2614C19.9955 50.0571 20.8535 49.9492 21.7105 49.947C23.1833 49.947 24.3872 50.2169 25.3287 50.7539C26.0465 51.226 26.3872 51.8912 26.3472 52.7456C26.3091 54.0337 25.6747 55.2095 24.4477 56.2729C22.4293 58.0037 20.9769 59.2715 20.0879 60.0762C19.7597 60.184 19.4491 60.3514 19.159 60.5686C18.5495 61.0362 18.2035 61.6147 18.1156 62.3025C18.0251 62.9971 18.2186 63.6291 18.695 64.1954C19.1812 64.7588 19.8227 65.1133 20.6203 65.2588C21.7497 65.5469 23.3113 65.4021 25.3021 64.8274C25.3234 64.8108 25.3473 64.7995 25.3731 64.7875C26.3029 64.4971 26.9825 64.3319 27.4128 64.295C29.4055 64.344 31.4691 65.0529 33.6039 66.4226C35.5567 67.6828 36.6985 68.9973 37.0356 70.3639C37.1624 71.0977 37.5794 71.6912 38.2874 72.1384C39.0008 72.5962 39.7984 72.7712 40.6759 72.6709C41.5392 72.563 42.2366 72.2086 42.7636 71.6052C43.2994 70.9974 43.5079 70.3224 43.3882 69.5765C43.0448 66.8977 41.0646 64.4 37.4526 62.0876C34.9496 60.4782 32.4903 59.4661 30.0798 59.0543C31.8897 57.1372 32.7787 55.0347 32.7467 52.7472C32.7157 50.0367 31.5259 47.9213 29.1765 46.4009L29.1295 46.379C27.2273 45.1324 24.7527 44.5064 21.7096 44.5064C21.109 44.5049 20.5056 44.5313 19.9023 44.5849C17.7233 40.928 15.4742 36.2181 13.1559 30.4541C10.5342 23.9757 9.16619 19.6792 9.05081 17.5653V17.5268C8.97717 15.6309 9.25575 13.9431 9.88569 12.4611V12.4212C10.3577 11.2945 11.2103 10.4453 12.4363 9.88041C13.6261 9.53574 15.24 9.83215 17.2824 10.7658L17.2611 10.7454C19.7445 12.1497 21.8613 16.0781 23.6118 22.5316L23.5896 22.5112C25.6205 30.1299 27.8678 37.3102 30.3361 44.0537C30.5845 44.7249 31.0725 45.237 31.7955 45.5899C32.5195 45.9504 33.2852 46.0545 34.0907 45.9059C34.8989 45.7453 35.5395 45.3712 36.0168 44.7799C36.4986 44.2022 36.684 43.5642 36.5722 42.8689C34.8484 32.456 34.2698 23.79 34.8342 16.8743C35.3328 11.1366 36.7479 7.62891 39.077 6.34829C41.4005 5.37164 43.4749 5.27812 45.3151 6.07302L45.3372 6.09338C47.1206 6.92975 48.1791 8.11982 48.5143 9.65992L48.4886 9.62145C48.8337 11.8508 48.5241 16.0967 47.5632 22.3525C46.5642 28.8135 45.2217 35.0142 43.5299 40.9555C43.316 41.5083 43.1537 42.086 43.0419 42.6916C43.0321 42.7406 43.025 42.7851 43.0179 42.8273C42.9887 43.0702 42.9558 43.3273 42.9257 43.5973C42.8334 44.3425 43.0659 45.0076 43.6213 45.5877C44.1811 46.1676 44.9015 46.4979 45.7781 46.5719C46.6529 46.6503 47.4345 46.4527 48.1168 45.9821C48.8027 45.504 49.1877 44.8923 49.2773 44.1487C49.3031 43.9436 49.327 43.746 49.3483 43.5574C49.3581 43.5114 49.3652 43.4662 49.3723 43.4194C49.4219 43.2007 49.4823 42.9843 49.5577 42.7693C49.5887 42.709 49.6198 42.6441 49.65 42.5725C50.0474 41.5996 50.7057 40.6743 51.6214 39.7941L51.6453 39.7737C52.9513 38.5663 54.3815 37.9366 55.9342 37.8815C57.6199 37.9954 59.0954 38.9072 60.3632 40.6213L60.3393 40.5994C61.8298 42.6718 62.5706 44.9826 62.5653 47.5371C62.5724 50.5779 61.7837 53.3909 60.2 55.9718V55.953C58.6553 58.4349 56.7061 59.7419 54.3576 59.874C53.473 59.8959 52.8315 59.5904 52.4314 58.9682L52.4571 58.9871C51.931 58.0738 51.6684 56.8844 51.6684 55.4206C51.7402 54.9138 52.1421 53.8481 52.8741 52.2274C52.883 52.2086 52.8927 52.1905 52.8963 52.1686C53.6584 50.5939 54.1597 49.6413 54.4028 49.311C54.9866 48.7401 55.2492 48.0847 55.1915 47.3396C55.125 46.5945 54.7532 45.9776 54.0807 45.4873C53.4109 44.9904 52.6381 44.7679 51.7615 44.8161C50.8867 44.8765 50.1601 45.1925 49.5825 45.7626C49.0253 46.2143 48.1452 47.6873 46.9394 50.1782C46.9323 50.2001 46.9252 50.2182 46.9154 50.2371C45.7407 52.8412 45.1942 54.5676 45.2687 55.4198C45.2661 57.9486 45.7762 59.9931 46.7992 61.5489L46.8232 61.5707C48.3944 64.0391 50.892 65.285 54.3105 65.3153C54.4134 67.3259 55.4594 69.0152 57.4405 70.3789L57.4663 70.4007C59.2159 71.6089 61.3568 72.2522 63.8863 72.3314C63.9156 72.526 63.9555 72.7492 64.0025 73.0026V73.0215C64.0877 73.4468 64.1338 73.7553 64.1427 73.9476C64.1214 76.2447 63.07 78.2485 60.9913 79.9591C59.0013 81.6108 56.7442 82.4976 54.2217 82.6177C53.3372 82.6546 52.5981 82.9503 51.9957 83.5068C51.3968 84.0604 51.1191 84.7127 51.1608 85.4564C51.2016 86.2076 51.5494 86.838 52.2024 87.3471C52.8554 87.8562 53.6202 88.093 54.4975 88.0583C55.0334 88.0395 55.5586 87.9995 56.0759 87.9407C55.5613 90.6218 54.0228 92.3963 51.4615 93.2599C47.4575 94.4311 43.472 94.8036 39.4982 94.3866C35.4169 93.9574 31.6763 93.0313 28.2758 91.6135L28.276 91.6124Z" fill="red"/>
        </SvgIcon>
    )
}

export default ScissorsIcon