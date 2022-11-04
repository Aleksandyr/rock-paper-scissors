import React from 'react'
import { SvgIcon, SvgIconProps } from "@mui/material"

const LoginIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon viewBox='0 0 80 90' {...props}>
            <g id="rock-paper-scissors-logo">
                <path id="Vector" d="M52.7113 35.4935C53.5627 36.1216 54.6987 36.4357 55.8338 36.0172C57.3479 35.4935 58.3887 33.8181 58.3887 32.0384V28.3735C59.7134 27.5358 60.6598 26.0701 60.8487 24.2902L61.5114 18.9507C61.8896 16.1236 61.0382 13.192 59.3353 10.9937L55.0775 5.54907V1.25618C55.0775 0.52292 54.6043 0 53.9422 0C53.2796 0 52.807 0.52365 52.807 1.25618V6.07276C52.807 6.3868 52.9014 6.70085 53.0908 6.91045L57.6324 12.6691C58.9571 14.3445 59.5247 16.4384 59.2409 18.6374L58.5783 23.977C58.3888 25.5472 57.1592 26.699 55.7394 26.5945L49.8731 26.49C49.116 26.49 48.5484 25.8619 48.5484 25.0243C48.5484 24.6058 48.7379 24.291 48.9266 23.977C49.2105 23.6629 49.4943 23.5585 49.8731 23.5585L53.8472 23.7681C54.4148 23.7681 54.8881 23.3496 54.9825 22.7208L55.3607 19.8937C55.455 19.1604 54.9825 18.5324 54.4142 18.4279C53.8466 18.3235 53.1839 18.8464 53.0895 19.4752L52.9001 20.941C48.926 18.8472 49.2099 14.5543 49.2099 14.3447C49.3042 13.6114 48.8317 13.0885 48.169 12.9834H48.0746C47.507 12.9834 47.0337 13.507 46.9394 14.1351C46.7499 15.9149 47.2232 18.8464 49.2104 21.15C48.4534 21.2545 47.6963 21.5685 47.1288 22.1973C46.845 22.5114 46.6555 22.8254 46.4661 23.1395C45.8985 22.721 45.2358 22.5114 44.4787 22.5114C43.3435 22.5114 42.3026 23.1394 41.6399 24.0816C41.0723 23.5579 40.3153 23.3483 39.5582 23.3483C38.9906 23.3483 38.5174 23.4527 38.0442 23.7668C37.4765 20.2072 37.3815 16.5423 37.3815 13.9248C37.3815 11.6214 38.5167 9.52738 40.2203 8.27135L41.2612 7.5381C41.6394 7.32849 41.8288 6.91001 41.8288 6.4908V1.46537C41.8288 0.732117 41.3555 0.209195 40.6935 0.209195C40.0309 0.209195 39.5583 0.732847 39.5583 1.46537V5.75827L39.3695 5.86344C36.9095 7.53881 35.4899 10.4704 35.3954 13.6114C35.3954 16.857 35.4898 21.5685 36.4363 25.8614C36.3419 26.2798 36.2469 26.6991 36.2469 27.1175V31.2008C36.2469 33.3999 37.8553 35.3885 39.8426 35.3885C40.6941 35.3885 41.3567 35.0744 42.0188 34.6552C42.6814 35.5974 43.7216 36.2254 44.8576 36.2254C45.6146 36.2254 46.3717 35.9114 46.9392 35.4922C47.6019 36.4343 48.6421 37.1675 49.8723 37.1675C51.0082 37.0638 52.0491 36.4357 52.7111 35.4936L52.7113 35.4935ZM53.374 29.0016L55.6451 29.106H56.0232V32.2472C56.0232 33.0849 55.4556 33.713 54.6986 33.713C53.9415 33.713 53.3739 33.0849 53.3739 32.2472L53.374 29.0016ZM41.2625 31.4095C41.2625 32.2472 40.6948 32.8753 39.9378 32.8753C39.1808 32.8753 38.6131 32.2472 38.6131 31.4095V27.1166C38.6131 26.2789 39.1808 25.6508 39.9378 25.6508C40.6948 25.6508 41.2625 26.2789 41.2625 27.1166V31.4095ZM46.1823 32.1427C46.1823 32.9804 45.6146 33.6085 44.8576 33.6085C44.1005 33.6085 43.5329 32.9804 43.5329 32.1427V26.3841C43.5329 25.5464 44.1006 24.9183 44.8576 24.9183C45.6146 24.9183 46.1823 25.5464 46.1823 26.3841V32.1427ZM48.4533 33.0849V28.5831C48.9266 28.7928 49.3998 28.8972 49.8724 29.0016H51.1027V33.0849C51.1027 33.9226 50.535 34.5507 49.778 34.5507C49.021 34.5507 48.4533 33.9226 48.4533 33.0849V33.0849Z" fill="gray"/>
                <path id="Vector_2" d="M40.789 47.6388C39.9376 47.2203 38.8968 47.1151 38.0454 47.5343L29.5298 50.9894L35.2074 45.7544C36.7215 44.3931 36.9102 41.7756 35.6806 40.101C34.356 38.4256 32.0849 38.2168 30.5714 39.5773L20.4453 48.8957C19.1206 47.8484 17.3228 47.6395 15.7142 48.372L11.1726 50.4658C8.71259 51.6176 6.91478 53.8166 6.06336 56.5384L3.98169 63.3436L0.575331 65.5427C0.0077051 65.8567 -0.181724 66.6944 0.197133 67.218C0.57533 67.7417 1.238 68.0557 1.71122 67.6365L5.49573 65.2286C5.77955 65.1242 5.87393 64.8101 5.96898 64.4953L8.14509 57.2708C8.80776 55.177 10.1325 53.5016 12.0247 52.6638L16.5664 50.57C17.891 49.9419 19.3101 50.57 20.0672 51.8262V51.9306L22.906 57.5841C23.2842 58.3173 23.0004 59.1543 22.4328 59.5736C22.1489 59.8883 21.7701 59.8883 21.3919 59.7839C21.0137 59.6795 20.7292 59.3654 20.6348 59.0506L18.7426 55.0718C18.4588 54.5482 17.8911 54.2341 17.3235 54.4438L14.958 55.4911C14.3904 55.7007 14.1066 56.4332 14.2953 57.0613C14.4848 57.6894 15.1468 58.0034 15.7144 57.7945L16.9447 57.2709C17.3229 62.0874 13.8222 63.9717 13.6326 64.076C13.065 64.3901 12.7811 65.1233 13.065 65.7514C13.065 65.7514 13.065 65.8558 13.1593 65.8558C13.4432 66.3795 14.1058 66.6935 14.5784 66.3795C15.9974 65.6462 18.0792 63.762 18.9313 60.726C19.4045 61.3541 20.0666 61.8778 20.8236 62.0874C21.2018 62.1918 21.5806 62.297 22.0538 62.1918C22.0538 62.7154 22.0538 63.3435 22.2433 63.8672C22.3376 64.0768 22.4327 64.2856 22.5271 64.4952C23.0003 65.3329 23.7574 65.961 24.5145 66.2751C24.2306 67.2179 24.2306 68.0549 24.5145 68.8926C24.6088 69.1022 24.7039 69.311 24.7983 69.5207C25.0821 70.0443 25.4609 70.4628 25.8391 70.7768C23.4736 72.8706 20.9187 74.546 19.0264 75.8023C17.2284 76.954 15.0523 76.954 13.1601 75.9067L12.0248 75.2786C11.6466 75.069 11.2678 75.069 10.8896 75.2786L7.00925 77.688C6.44162 78.0021 6.25219 78.8398 6.63105 79.3634C6.91486 79.9915 7.67192 80.2011 8.14514 79.7819L11.5515 77.5828L12.1191 77.8968C14.6741 79.3626 17.7016 79.3626 20.1623 77.7924C22.5278 76.3266 25.8399 74.0232 28.6778 71.3012C28.8673 71.3012 28.9617 71.1967 29.1511 71.1967L32.7469 69.731C34.6391 68.9977 35.5857 66.695 34.923 64.6005C34.6392 63.7628 34.1659 63.1347 33.5039 62.7162C33.5983 62.6118 33.6934 62.4022 33.7877 62.2978C34.1659 61.3556 34.261 60.2039 33.8821 59.2618C33.6927 58.7382 33.5039 58.3197 33.2195 58.0057L40.5055 55.074C41.4519 54.76 42.1139 54.0268 42.5871 52.9802C42.9653 52.0381 43.0604 50.8864 42.6815 49.9443C42.3033 48.8955 41.6406 48.1623 40.7892 47.6387L40.789 47.6388ZM22.054 50.78C22.054 50.78 22.054 50.6755 21.9597 50.6755L31.8951 41.4617C32.4627 40.9381 33.3141 41.0432 33.7873 41.6713C33.8817 41.7758 33.8817 41.7758 33.8817 41.8809C34.1655 42.509 34.0711 43.3467 33.5979 43.7652L23.2843 53.2931L22.054 50.78ZM24.9871 63.972C24.7033 63.7624 24.4195 63.5535 24.3245 63.1343C24.0406 62.401 24.4188 61.4589 25.0815 61.2501L30.002 59.2606C30.3802 59.1561 30.6647 59.1561 31.0429 59.2606C31.3267 59.365 31.5161 59.5746 31.6105 59.8887C31.6105 59.9931 31.7049 59.9931 31.7049 60.0983C31.7992 60.5168 31.7992 60.8315 31.6105 61.25C31.421 61.5641 31.2323 61.8781 30.8534 61.9833L25.9329 63.9728C25.6491 64.1816 25.2709 64.1816 24.9871 63.972V63.972ZM32.7457 66.6946C32.5563 67.0086 32.3675 67.3227 31.9887 67.4278L28.3929 68.8936C28.0147 68.998 27.7302 68.998 27.352 68.8936C26.9738 68.7892 26.7844 68.4751 26.6894 68.0559C26.595 67.6374 26.595 67.3226 26.6894 66.9042C26.8788 66.5901 27.1626 66.2761 27.4464 66.1709L31.0422 64.7051C31.7049 64.3911 32.5563 64.8096 32.745 65.5428C32.9351 65.9613 32.9351 66.2754 32.7457 66.6946H32.7457ZM40.4099 51.9317C40.2204 52.2457 40.0317 52.5598 39.6528 52.6649L25.2702 58.4236C25.2702 57.7955 25.1758 57.0623 24.892 56.4341L24.5138 55.5964L38.8015 49.8377C39.1797 49.7333 39.4641 49.7333 39.8423 49.8377C40.1261 50.0473 40.41 50.2562 40.505 50.6754C40.5994 51.1991 40.5994 51.5131 40.41 51.9316L40.4099 51.9317Z" fill="red"/>
                <path id="Vector_3" d="M89.4243 64.6002L86.1122 62.5064L84.4094 56.3292C83.6523 53.3976 81.8545 50.9897 79.3945 49.5241L72.2979 45.3365C70.595 44.2892 68.5134 44.918 67.4724 46.8022C67.378 46.9067 67.378 47.1163 67.2829 47.2207L59.6188 42.5094C57.916 41.4621 55.6447 42.0909 54.6983 43.9752C54.4145 44.4988 54.3201 45.1269 54.2251 45.755C52.806 45.5454 51.3863 46.2786 50.6293 47.7445C49.8723 49.2102 50.0617 50.99 50.9131 52.1419C50.4399 52.4559 50.0617 52.8751 49.7779 53.5032C48.8314 55.3874 49.3997 57.9006 51.1025 58.9478L52.4272 59.7855C52.049 60.0995 51.7645 60.5187 51.5758 60.9372C50.6293 62.8214 51.1976 65.3346 52.9004 66.3818L57.7259 69.4177C58.8612 70.151 60.0915 70.9879 61.4162 72.2448L61.6056 72.3493C64.6338 74.9668 72.5818 81.7719 78.3537 77.6888L81.6658 79.7826C82.2334 80.0967 82.8961 79.887 83.1799 79.259C83.4637 78.6309 83.2743 77.8976 82.7066 77.5836L78.827 75.1757C78.4488 74.9661 77.9756 74.9661 77.5967 75.2801C73.1495 79.1538 65.7691 72.7671 62.9303 70.3592L62.7408 70.2548C61.3218 68.9986 59.9972 68.0557 58.7668 67.3232L53.9412 64.2872C53.2786 63.8687 53.0898 63.031 53.468 62.2977C53.8462 61.5645 54.6983 61.3556 55.266 61.7741L62.3626 66.1715C62.9302 66.4855 63.5928 66.2759 63.8767 65.6478C64.1605 65.0198 63.971 64.2865 63.4034 63.9725L52.3327 56.748C51.6701 56.3295 51.4813 55.3866 51.8595 54.7585C52.2377 54.0252 52.9947 53.8163 53.6575 54.2348L63.4034 60.3074C63.9711 60.6215 64.6337 60.4119 64.9175 59.889C65.2013 59.2609 65.0119 58.5276 64.4443 58.2136L53.0899 51.0944C52.4272 50.6759 52.2385 49.733 52.6167 49.1049C52.9949 48.3716 53.847 48.1627 54.4147 48.5812L64.9176 55.1775C65.4852 55.4916 66.1479 55.2819 66.4317 54.6539C66.7155 54.0258 66.5261 53.2925 65.9585 52.9785L57.0639 47.4294C56.4012 47.0109 56.2125 46.0681 56.5907 45.4399C56.9688 44.7066 57.7259 44.4978 58.3886 44.9162L66.9042 50.2558C67.188 51.3031 67.7556 52.2452 68.607 52.7687L71.067 54.339C69.0796 63.1336 75.3248 66.0652 75.4199 66.0652C75.9876 66.2748 76.5552 66.0652 76.839 65.5415C76.839 65.5415 76.839 65.4371 76.9334 65.4371C77.1228 64.809 76.839 64.0758 76.2707 63.8669C76.0813 63.7625 72.0129 61.8774 73.0537 55.8048C73.3376 56.0144 73.7164 56.3284 74.0002 56.6425L74.5678 57.1661C75.0411 57.5846 75.7031 57.5846 76.1763 57.0617C76.5545 56.5381 76.5545 55.8055 76.0819 55.2819L75.5143 54.7582C74.9473 53.6065 74.2847 52.9784 73.4333 52.5592L69.8375 50.2558C69.4594 50.0462 69.2699 49.7321 69.1749 49.3136C69.0805 48.8951 69.1749 48.4759 69.3643 48.1619C69.7425 47.4286 70.5946 47.2198 71.1623 47.6382L78.2589 51.8259C80.1511 52.9776 81.5709 54.8618 82.233 57.1654L84.0309 63.8662C84.1253 64.1803 84.3147 64.3899 84.5986 64.5995L88.2888 66.9029C88.8564 67.2169 89.5191 67.0073 89.8029 66.3792C90.1817 65.7519 89.9923 64.9142 89.4247 64.6001L89.4243 64.6002Z" fill="green"/>
            </g>
        </SvgIcon>
    )
}

export default LoginIcon