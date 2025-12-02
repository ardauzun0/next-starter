
'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import * as VanillaCookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

export default function CookieConsent() {
    const locale = useLocale();

    useEffect(() => {
        VanillaCookieConsent.run({
            categories: {
                necessary: {
                    enabled: true, // this category is enabled by default
                    readOnly: true, // this category cannot be disabled
                },
                analytics: {},
            },
            guiOptions: {
                consentModal: {
                    layout: 'bar inline',
                    position: 'bottom center',
                },
            },
            language: {
                default: locale,
                translations: {
                    en: {
                        consentModal: {
                            title: 'Cookie Consent',
                            description:
                                'This website uses cookies to ensure you get the best experience on our website. Cookies are used to provide the basic functionalities of the website and to enhance your online experience.',
                            acceptAllBtn: 'Accept all',
                            acceptNecessaryBtn: 'Reject all',
                            showPreferencesBtn: 'Manage preferences',
                        },
                        preferencesModal: {
                            title: 'Cookie preferences',
                            acceptAllBtn: 'Accept all',
                            acceptNecessaryBtn: 'Reject all',
                            savePreferencesBtn: 'Save preferences',
                            closeIconLabel: 'Close',
                            sections: [
                                {
                                    title: 'Cookie usage',
                                    description:
                                        'We use cookies to ensure the basic functionalities of the website and to enhance your online experience ...',
                                },
                                {
                                    title: 'Strictly necessary cookies',
                                    description:
                                        'These cookies are essential for the proper functioning of our website. Without these cookies, the website would not work properly',
                                    linkedCategory: 'necessary',
                                    cookieTable: {
                                        headers: {
                                            name: 'Name',
                                            domain: 'Service',
                                            description: 'Description',
                                            expiration: 'Expiration',
                                        },
                                        body: [
                                            {
                                                name: 'greensoft_session',
                                                domain: 'greensoft.ai',
                                                description: 'Cookie to manage the user session',
                                                expiration: 'Session',
                                            },
                                            {
                                                name: 'XSRF-TOKEN',
                                                domain: 'greensoft.ai',
                                                description: 'Cookie used for security purposes',
                                                expiration: 'Session',
                                            },
                                        ],
                                    },
                                },
                                {
                                    title: 'Performance and Analytics cookies',
                                    description: 'These cookies allow the website to remember the choices you have made in the past',
                                    linkedCategory: 'analytics',
                                    cookieTable: {
                                        headers: {
                                            name: 'Name',
                                            domain: 'Service',
                                            description: 'Description',
                                            expiration: 'Expiration',
                                        },
                                        body: [
                                            {
                                                name: '_ga',
                                                domain: 'Google Analytics',
                                                description: 'Cookie set by <a href="#das">Google Analytics</a>.',
                                                expiration: 'Expires after 12 days',
                                            },
                                            {
                                                name: '_gid',
                                                domain: 'Google Analytics',
                                                description: 'Cookie set by <a href="#das">Google Analytics</a>',
                                                expiration: 'Session',
                                            },
                                        ],
                                    },
                                },
                                {
                                    title: 'More information',
                                    description:
                                        'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="/contact">contact us</a>.',
                                },
                            ],
                        },
                    },
                    tr: {
                        consentModal: {
                            title: 'Çerez Onayı',
                            description:
                                'Bu web sitesinde size en iyi deneyimi sunmak için çerezler kullanılmaktadır. Çerezler web sitemizin temel işlevlerini sağlamak ve çevrimiçi deneyiminizi geliştirmek için kullanılmaktadır.',
                            acceptAllBtn: 'Hepsini kabul et',
                            acceptNecessaryBtn: 'Hepsini reddet',
                            showPreferencesBtn: 'Tercihleri yönet',
                        },
                        preferencesModal: {
                            title: 'Çerez tercihleri',
                            acceptAllBtn: 'Hepsini kabul et',
                            acceptNecessaryBtn: 'Hepsini reddet',
                            savePreferencesBtn: 'Tercihleri kaydet',
                            closeIconLabel: 'Kapat',
                            sections: [
                                {
                                    title: 'Çerez kullanımı',
                                    description:
                                        'Web sitesinin temel işlevlerini sağlamak ve çevrimiçi deneyiminizi geliştirmek için çerezleri kullanıyoruz ...',
                                },
                                {
                                    title: 'Kesinlikle gerekli çerezler',
                                    description:
                                        'Bu çerezler, web sitenin düzgün çalışması için gereklidir. Bu çerezler olmadan, web sitesi düzgün çalışmaz',
                                    linkedCategory: 'necessary',
                                    cookieTable: {
                                        headers: {
                                            name: 'Ad',
                                            domain: 'Hizmet',
                                            description: 'Alan Adı',
                                            expiration: 'Sona Erme',
                                        },
                                        body: [
                                            {
                                                name: 'greensoft_session',
                                                domain: 'greensoft.ai',
                                                description: 'Kullanıcı oturumunu yönetmek için çerez',
                                                expiration: 'Oturum',
                                            },
                                            {
                                                name: 'XSRF-TOKEN',
                                                domain: 'greensoft.ai',
                                                description: 'Güvenlik için kullanılan XSRF çerezi',
                                                expiration: 'Oturum',
                                            },
                                        ],
                                    },
                                },
                                {
                                    title: 'Performans ve Analitik çerezler',
                                    description: 'Bu çerezler, web sitesinin geçmişte yaptığınız seçimleri hatırlamasını sağlar',
                                    linkedCategory: 'analytics',
                                    cookieTable: {
                                        headers: {
                                            name: 'Ad',
                                            domain: 'Hizmet',
                                            description: 'Açıklama',
                                            expiration: 'Sona Erme',
                                        },
                                        body: [
                                            {
                                                name: '_ga',
                                                domain: 'Google Analytics',
                                                description: '<a href="#das">Google Analytics</a> tarafından ayarlanan çerez.',
                                                expiration: '12 gün sonra sona erer',
                                            },
                                            {
                                                name: '_gid',
                                                domain: 'Google Analytics',
                                                description: '<a href="#das">Google Analytics</a> tarafından ayarlanan çerez',
                                                expiration: 'Oturum',
                                            },
                                        ],
                                    },
                                },
                                {
                                    title: 'Daha fazla bilgi',
                                    description:
                                        'Çerez politikamız ve seçimlerinizle ilgili herhangi bir sorunuz için, lütfen <a class="cc-link" href="#yourdomain.com">bizimle iletişime geçin</a>.',
                                },
                            ],
                        },
                    },
                },
            },
        });
    }, [locale]);

    return null;
}
